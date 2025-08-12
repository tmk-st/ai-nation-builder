import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CountryCreator from '../components/country/CountryCreator'
import FlagGenerator from '../components/country/FlagGenerator'
import Button from '../components/common/Button'
import { CountryData, FlagDesign } from '../types'
import CustomFlagPreview from '../components/country/CustomFlagPreview'
import { flagColors, flagPatterns, governmentTypes } from '../constants'

const CountrySetup: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<'basic' | 'flag' | 'confirm'>(
    'basic',
  )
  const [countryData, setCountryData] = useState<CountryData>({
    name: '',
    population: 1000000,
    government: '',
    description: '',
  })
  const [flagDesign, setFlagDesign] = useState<FlagDesign>({
    backgroundColor: '#3742FA',
    pattern: 'solid',
    symbolColor: '#FFFFFF',
    symbol: 'star',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  /*
   * 政治体制の名称を取得
   */
  const getGovernmentLabel = (val: string) => {
    const governmentType = governmentTypes.find((type) => type.value === val)
    return governmentType ? governmentType.label : null
  }

  /*
   * 国旗の色名を取得
   */
  const getColorName = (colorCode: string) => {
    const foundColor = flagColors.find((color) => color.value === colorCode)
    return foundColor ? foundColor.name : null
  }

  /*
   * 国旗のパターン名を取得
   */
  const getPatternName = (val: string) => {
    const foundPattern = flagPatterns.find((pattern) => pattern.value === val)
    return foundPattern ? foundPattern.label : null
  }

  /*
   * 基本情報を更新
   */
  const handleCountryDataChange = (data: CountryData) => {
    setCountryData(data)
  }

  /*
   * 国旗デザインを更新
   */
  const handleFlagDesignChange = (design: FlagDesign) => {
    setFlagDesign(design)
  }

  /*
   * 次のステップ
   */
  const handleNextStep = () => {
    if (currentStep === 'basic') {
      setCurrentStep('flag')
    } else if (currentStep === 'flag') {
      setCurrentStep('confirm')
    }
  }

  /*
   * 前のステップ
   */
  const handlePrevStep = () => {
    if (currentStep === 'flag') {
      setCurrentStep('basic')
    } else if (currentStep === 'confirm') {
      setCurrentStep('flag')
    }
  }

  /*
   * ゲーム画面へ遷移
   */
  const handleStartGame = () => {
    navigate('/game', {
      state: {
        countryData,
        flagDesign,
      },
    })
  }

  /*
   * 必須項目バリデーション
   */
  const isBasicDataValid = () => {
    return countryData.name.trim() !== '' && countryData.government !== ''
  }

  // インジケーターコンポーネント
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'basic'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          1
        </div>
        <div className="w-8 h-1 bg-gray-300"></div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'flag'
              ? 'bg-blue-500 text-white'
              : currentStep === 'confirm'
                ? 'bg-gray-300 text-gray-600'
                : 'bg-gray-300 text-gray-600'
          }`}
        >
          2
        </div>
        <div className="w-8 h-1 bg-gray-300"></div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'confirm'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          3
        </div>
      </div>
    </div>
  )

  // ステップタイトルコンポーネント
  const renderStepTitle = () => {
    const titles = {
      basic: '基本情報の設定',
      flag: '国旗のデザイン',
      confirm: '設定の確認',
    }
    return (
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        {titles[currentStep]}
      </h2>
    )
  }

  // 確認画面コンポーネント
  const renderConfirmationStep = () => (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* 国家情報 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">国家情報</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">国名:</span>
              <p className="font-medium">{countryData.name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">人口:</span>
              <p className="font-medium">
                {countryData.population.toLocaleString()}人
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">政治体制:</span>
              <p className="font-medium">
                {getGovernmentLabel(countryData.government)}
              </p>
            </div>
            {countryData.description && (
              <div>
                <span className="text-sm text-gray-600">国の説明:</span>
                <p className="text-sm">{countryData.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* 国旗プレビュー */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">国旗</h3>
          <CustomFlagPreview flagDesign={flagDesign} />
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex">
              <p>背景色: {getColorName(flagDesign.backgroundColor)}</p>
              {flagDesign.pattern !== 'solid' && (
                <p>&nbsp;+ {getColorName(flagDesign.symbolColor)}</p>
              )}
            </div>
            <div className="flex items-center">
              <p>シンボル:</p>
              <img
                src={`/assets/${flagDesign.symbol}.png`}
                alt="symbol"
                className="w-6"
              />
            </div>
            <p>パターン: {getPatternName(flagDesign.pattern)}</p>
          </div>
        </div>
      </div>

      {/* 警告メッセージ */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <div className="flex items-start">
          <img src="/assets/warning.png" alt="icon" className="w-8" />
          <p className="text-sm text-yellow-700 mt-1">
            これらの設定でゲームを開始します。後から変更することはできません。
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            新しい国家を設立しましょう
          </h1>
        </div>

        {/* ステップインジケーター */}
        {renderStepIndicator()}

        {/* ステップタイトル */}
        {renderStepTitle()}

        {/* コンテンツエリア */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 'basic' && (
            <CountryCreator
              countryData={countryData}
              onChange={handleCountryDataChange}
            />
          )}

          {currentStep === 'flag' && (
            <FlagGenerator
              flagDesign={flagDesign}
              onChange={handleFlagDesignChange}
            />
          )}

          {currentStep === 'confirm' && renderConfirmationStep()}
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between items-center w-full mx-auto mt-8">
          <div>
            {currentStep !== 'basic' && (
              <Button
                onClick={handlePrevStep}
                variant="secondary"
                className="flex items-center"
              >
                ← 前へ
              </Button>
            )}
          </div>

          <div>
            {currentStep === 'basic' && (
              <Button
                onClick={handleNextStep}
                disabled={!isBasicDataValid()}
                className="flex items-center"
              >
                次へ: 国旗デザイン →
              </Button>
            )}

            {currentStep === 'flag' && (
              <Button onClick={handleNextStep} className="flex items-center">
                次へ: 設定確認 →
              </Button>
            )}

            {currentStep === 'confirm' && (
              <Button
                onClick={handleStartGame}
                variant="primary"
                className="bg-green-600 hover:bg-green-700 flex items-center text-lg px-8 py-3"
              >
                <img src="/assets/rocket.png" alt="icon" className="w-8" />
                ゲーム開始！
              </Button>
            )}
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-full mx-auto mt-6">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width:
                  currentStep === 'basic'
                    ? '33%'
                    : currentStep === 'flag'
                      ? '66%'
                      : '100%',
              }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {currentStep === 'basic'
              ? 'ステップ 1/3'
              : currentStep === 'flag'
                ? 'ステップ 2/3'
                : 'ステップ 3/3'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountrySetup
