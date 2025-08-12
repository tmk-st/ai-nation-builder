import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CountryCard from '../components/country/CountryCard'
import ScoreDashboard from '../components/game/ScoreDashboard'
import PolicyCard from '../components/game/PolicyCard'
import AIBureaucrat from '../components/game/AIBureaucrat'
import CitizenVoices from '../components/game/CitizenVoices'
import PolicyInput from '../components/game/PolicyInput'
import Button from '../components/common/Button'
import Loading from '../components/common/Loading'
import {
  CountryStats,
  PolicyIssue,
  BureaucratMessage,
  CitizenVoice,
  GameSession,
} from '../types'
import {
  generateBureaucratMessage,
  generateCitizenVoices,
  generatePolicyIssue,
} from '../services/api'

const GameMain: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // ルート状態から国家データを取得
  const { countryData, flagDesign } = location.state || {}

  // ゲーム状態管理
  const [gameSession, setGameSession] = useState<GameSession | null>(null)
  const [currentStats, setCurrentStats] = useState<CountryStats>({
    happiness: 50,
    economy: 50,
    environment: 50,
    security: 50,
    education: 50,
    healthcare: 50,
  })

  const [currentPolicyIssue, setCurrentPolicyIssue] =
    useState<PolicyIssue | null>(null)
  const [bureaucratMessages, setBureaucratMessages] = useState<
    BureaucratMessage[]
  >([])
  const [citizenVoices, setCitizenVoices] = useState<CitizenVoice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [gamePhase, setGamePhase] = useState<
    'briefing' | 'policy' | 'discussion' | 'result'
  >('briefing')
  const [turnNumber, setTurnNumber] = useState(1)

  const BUDGET_PER_PERSON = 1000 // 人口1人あたりの予算

  const [budget, setBudget] = useState(() => {
    return countryData?.population
      ? countryData.population * BUDGET_PER_PERSON
      : 1000000
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [gamePhase])

  // 国家データがない場合はセットアップページにリダイレクト
  useEffect(() => {
    if (!countryData || !flagDesign) {
      navigate('/setup')
      return
    }

    // ゲームセッション初期化
    initializeGameSession()
  }, [countryData, flagDesign, navigate])

  /*
   * ゲームセッション初期化
   */
  const initializeGameSession = () => {
    const session: GameSession = {
      id: `session-${Date.now()}`,
      countryId: countryData?.name || 'unknown',
      playerId: 'player-1', // TODO: 実際のプレイヤーID
      stats: currentStats,
      startedAt: new Date(),
      lastActivityAt: new Date(),
      turnNumber: 1,
      budget: budget,
      completedPolicies: [],
      achievements: [],
    }

    setGameSession(session)
    generateInitialPolicyIssue()
  }

  /*
   * 政策課題生成
   */
  const generateInitialPolicyIssue = async () => {
    const policyIssue = await generatePolicyIssue(
      countryData,
      currentStats,
      turnNumber,
    )
    setCurrentPolicyIssue(policyIssue)

    // AI官僚からの初期メッセージ
    const message = await generateBureaucratMessage(
      countryData,
      policyIssue,
      'question',
    )

    setBureaucratMessages([message])
    setGamePhase('policy')
  }

  /*
   * 政策決定
   */
  const handlePolicyDecision = async (optionId: string, reasoning: string) => {
    if (!currentPolicyIssue) return

    setIsLoading(true)

    try {
      // 選択した政策オプションを取得
      const selectedOption = currentPolicyIssue.options.find(
        (opt) => opt.id === optionId,
      )
      if (!selectedOption) return

      // 予算から差し引き
      setBudget((prev) => prev - selectedOption.cost)

      // 統計を更新
      const newStats = { ...currentStats }
      Object.entries(selectedOption.impact).forEach(([key, value]) => {
        if (key in newStats && typeof value === 'number') {
          ;(newStats as CountryStats)[key] = Math.max(
            0,
            Math.min(100, (newStats as CountryStats)[key] + value),
          )
        }
      })
      setCurrentStats(newStats)

      const citizenVoices = await generateCitizenVoices(
        currentPolicyIssue,
        selectedOption,
        reasoning,
        countryData,
        currentStats,
      )

      setCitizenVoices(citizenVoices)

      // AI官僚からのフィードバック
      const feedbackMessage: BureaucratMessage = {
        id: `msg-${Date.now()}`,
        type: 'neutral',
        message: `${selectedOption.title}の実施を決定いたします。${selectedOption.consequences}実施には${selectedOption.timeToImplement}ヶ月を要する見込みです。国民の反応を注視しながら、政策効果を測定していきましょう。`,
        timestamp: new Date(),
        policyIssueId: currentPolicyIssue.id,
      }

      setBureaucratMessages((prev) => [...prev, feedbackMessage])
      setGamePhase('result')
    } catch (error) {
      console.error('Policy decision error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  /*
   * 次の政策課題へ
   */
  const handleNextTurn = () => {
    setTurnNumber((prev) => prev + 1)
    setGamePhase('briefing')

    // 次の政策課題を生成
    setTimeout(() => {
      generateInitialPolicyIssue()
    }, 1000)
  }

  /*
   * ゲーム終了画面へ遷移
   */
  const handleEndGame = () => {
    navigate('/results', {
      state: {
        countryData,
        flagDesign,
        finalStats: currentStats,
        turnNumber,
        gameSession,
      },
    })
  }

  if (!countryData || !gameSession) {
    return <Loading message="ゲームを初期化しています..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ゲームヘッダー */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {countryData.name}
              </h1>
              <div className="text-sm text-gray-600">
                第{turnNumber}期 | 予算: ¥{budget.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="secondary"
                className="text-sm"
              >
                ホームに戻る
              </Button>
              <Button onClick={handleEndGame} className="text-sm">
                ゲーム終了
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左サイドバー - 国家情報 */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <CountryCard
                countryData={countryData}
                flagDesign={flagDesign}
                stats={currentStats}
              />
              <ScoreDashboard
                stats={currentStats}
                turnNumber={turnNumber}
                budget={budget}
              />
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              {gamePhase === 'briefing' && (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <h2 className="text-xl font-bold mb-4">
                    第{turnNumber}期開始
                  </h2>
                  <p className="text-gray-600 mb-6">
                    新しい政策課題を準備しています...
                  </p>
                  <Loading />
                </div>
              )}

              {gamePhase === 'policy' && currentPolicyIssue && (
                <>
                  <PolicyCard policyIssue={currentPolicyIssue} />
                  <PolicyInput
                    policyIssue={currentPolicyIssue}
                    onDecision={handlePolicyDecision}
                    isLoading={isLoading}
                  />
                </>
              )}

              {gamePhase === 'result' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="/assets/checkbox.png"
                      alt="icon"
                      className="w-8"
                    />
                    <h3 className="text-lg font-semibold text-green-600">
                      政策が実施されました
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    政策の効果が国家指標に反映されました。市民の反応をご確認ください。
                  </p>
                  <div className="flex justify-center">
                    <Button
                      onClick={handleNextTurn}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      次の政策課題へ →
                    </Button>
                  </div>
                </div>
              )}

              {/* 市民の声 */}
              {citizenVoices.length > 0 && (
                <CitizenVoices voices={citizenVoices} />
              )}
            </div>
          </div>

          {/* 右サイドバー - AI官僚とのチャット */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <AIBureaucrat
                messages={bureaucratMessages}
                countryName={countryData.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameMain
