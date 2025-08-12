import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import CountryCard from '../components/country/CountryCard'
import { CountryStats } from '../types'

const Results: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { countryData, flagDesign, finalStats, turnNumber, gameSession } =
    location.state || {}

  // データがない場合のリダイレクト
  React.useEffect(() => {
    if (!countryData || !finalStats) {
      navigate('/')
    }
  }, [countryData, finalStats, navigate])

  if (!countryData || !finalStats) {
    return null
  }

  /*
   * 総合評価の算出
   */
  const calculateOverallGrade = (stats: CountryStats) => {
    const average =
      Object.values(stats).reduce((sum, value) => sum + value, 0) /
      Object.values(stats).length

    if (average >= 90)
      return {
        grade: 'S',
        label: '伝説的',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
      }
    if (average >= 80)
      return {
        grade: 'A',
        label: '優秀',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
      }
    if (average >= 70)
      return {
        grade: 'B',
        label: '良好',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
      }
    if (average >= 60)
      return {
        grade: 'C',
        label: '普通',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
      }
    if (average >= 50)
      return {
        grade: 'D',
        label: '改善要',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
      }
    return {
      grade: 'F',
      label: '要再建',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    }
  }

  /*
   * 実績の算出
   */
  const getAchievements = (stats: CountryStats, turns: number) => {
    const achievements: { icon: string; title: string; description: string }[] =
      []

    if (Object.values(stats).every((s) => s >= 60)) {
      achievements.push({
        icon: 'trophy',
        title: 'バランス統治者',
        description: 'すべての指標で60以上を達成',
      })
    }

    if (stats.happiness >= 80) {
      achievements.push({
        icon: 'happiness',
        title: '国民の希望',
        description: '国民幸福度80以上を達成',
      })
    }

    if (stats.economy >= 80) {
      achievements.push({
        icon: 'money',
        title: '経済の魔術師',
        description: '経済指標80以上を達成',
      })
    }

    if (stats.environment >= 80) {
      achievements.push({
        icon: 'tree',
        title: '緑の指導者',
        description: '環境指標80以上を達成',
      })
    }

    if (turns >= 5) {
      achievements.push({
        icon: 'clock',
        title: '長期統治者',
        description: '5期以上の政権運営',
      })
    }

    const average =
      Object.values(stats).reduce((sum, value) => sum + value, 0) /
      Object.values(stats).length
    if (average >= 90) {
      achievements.push({
        icon: 'roman-laurel -wreath',
        title: '完璧な指導者',
        description: '平均スコア90以上の伝説的統治',
      })
    }

    return achievements
  }

  const overallGrade = calculateOverallGrade(finalStats) // 総合評価
  const achievements = getAchievements(finalStats, turnNumber) // 実績

  // 指標
  const statItems = [
    {
      key: 'happiness',
      label: '国民幸福度',
      icon: 'happiness',
      value: finalStats.happiness,
    },
    {
      key: 'economy',
      label: '経済状況',
      icon: 'money',
      value: finalStats.economy,
    },
    {
      key: 'environment',
      label: '環境指標',
      icon: 'tree',
      value: finalStats.environment,
    },
    {
      key: 'security',
      label: '治安・安全',
      icon: 'safety',
      value: finalStats.security,
    },
    {
      key: 'education',
      label: '教育水準',
      icon: 'education',
      value: finalStats.education,
    },
    {
      key: 'healthcare',
      label: '医療福祉',
      icon: 'medication',
      value: finalStats.healthcare,
    },
  ]

  // 指標に合わせたカラーの取得
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  /*
   * もう一度遊ぶボタン
   */
  const handlePlayAgain = () => {
    navigate('/setup')
  }

  /*
   * ホームに戻るボタン
   */
  const handleBackHome = () => {
    navigate('/')
  }

  /*
   * 共有ボタン押下
   */
  const handleShareResults = () => {
    // NOTE: 将来的にはソーシャル共有機能を実装
    alert('共有機能は準備中です！')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            統治結果発表
          </h1>
          <p className="text-gray-600">
            {countryData.name}の第{turnNumber}期政権の成果をご覧ください
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 左カラム - 国家情報 */}
            <div className="lg:col-span-1">
              <CountryCard
                countryData={countryData}
                flagDesign={flagDesign}
                stats={finalStats}
                showStats={true}
              />
            </div>

            {/* 中央・右カラム - 結果詳細 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 総合評価 */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center items-center mb-6">
                  <img src="/assets/graph.png" alt="icon" className="w-16" />
                  <h2 className="text-2xl font-bold text-gray-800">総合評価</h2>
                </div>

                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold mb-4 ${overallGrade.bgColor} ${overallGrade.color}`}
                  >
                    {overallGrade.grade}
                  </div>
                  <div className="text-xl font-semibold text-gray-800">
                    {overallGrade.label}な統治者
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    平均スコア:{' '}
                    {Math.round(
                      Object.values(finalStats as number[]).reduce(
                        (sum, value) => sum + value,
                        0,
                      ) / Object.values(finalStats).length,
                    )}
                    点
                  </div>
                </div>

                {/* 各指標の詳細 */}
                <div className="grid md:grid-cols-2 gap-4">
                  {statItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={`/assets/${item.icon}.png`}
                          alt="icon"
                          className="w-8"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={`text-lg font-bold ${getScoreColor(
                          item.value,
                        )}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 実績・アチーブメント */}
              {achievements.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-6">
                    <img src="/assets/trophy.png" alt="icon" className="w-12" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      獲得した実績
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={`/assets/${achievement.icon}.png`}
                            alt="icon"
                            className="w-8"
                          />
                          <div>
                            <h3 className="text-base font-semibold text-gray-800">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 統治サマリー */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <img src="/assets/graph-2.png" alt="icon" className="w-14" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    統治サマリー
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {turnNumber}
                    </div>
                    <div className="text-sm text-gray-600">実行した政策数</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {gameSession?.budget
                        ? `¥${Math.round(gameSession.budget / 10000)}万`
                        : '不明'}
                    </div>
                    <div className="text-sm text-gray-600">残存予算</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {achievements.length}
                    </div>
                    <div className="text-sm text-gray-600">獲得実績数</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    総評
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {overallGrade.grade === 'S' || overallGrade.grade === 'A'
                      ? `${countryData.name}の統治は素晴らしい成果を収めました。バランスの取れた政策決定により、国民の信頼を獲得し、持続可能な発展を実現されました。この経験を活かし、さらなる挑戦を続けてください。`
                      : overallGrade.grade === 'B' || overallGrade.grade === 'C'
                        ? `${countryData.name}の統治は概ね良好な結果でした。いくつかの分野では改善の余地がありますが、基本的な国家運営はできています。より戦略的な政策選択で、さらなる向上が期待できます。`
                        : `${countryData.name}の統治には課題が残りました。国家運営は困難な仕事ですが、この経験から多くを学ぶことができたはずです。次回はより慎重な政策選択で、国民の期待に応えましょう。`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="my-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handlePlayAgain}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              <img src="/assets/rocket.png" alt="icon" className="w-8" />
              もう一度プレイ
            </Button>

            <Button
              onClick={handleShareResults}
              variant="secondary"
              className="text-lg px-8 py-3"
            >
              <img src="/assets/mailbox.png" alt="icon" className="w-8" />
              結果を共有
            </Button>

            <Button
              onClick={handleBackHome}
              variant="secondary"
              className="text-lg px-8 py-3"
            >
              <img src="/assets/star.png" alt="icon" className="w-8" />
              ホームに戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
