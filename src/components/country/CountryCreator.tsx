import React from 'react'
import { CountryData } from '../../types'
import { governmentTypes } from '../../constants'

interface CountryCreatorProps {
  countryData: CountryData
  onChange: (data: CountryData) => void
}

const CountryCreator: React.FC<CountryCreatorProps> = ({
  countryData,
  onChange,
}) => {
  const selectedGovernment = governmentTypes.find(
    (gov) => gov.value === countryData.government,
  )

  const handleInputChange = (
    field: keyof CountryData,
    value: string | number,
  ) => {
    onChange({
      ...countryData,
      [field]: value,
    })
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        {/* 国名入力 */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            国名
          </label>
          <input
            type="text"
            value={countryData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="例: 平和国、イノベーション共和国"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>

        {/* 人口設定 */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            初期人口: {countryData.population.toLocaleString()}人
          </label>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={countryData.population}
            onChange={(e) =>
              handleInputChange('population', parseInt(e.target.value))
            }
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>10万人</span>
            <span>1000万人</span>
          </div>
        </div>

        {/* 政治体制選択 */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            政治体制
          </label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {governmentTypes.map((gov) => (
              <button
                key={gov.value}
                type="button"
                onClick={() => handleInputChange('government', gov.value)}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                  countryData.government === gov.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {gov.label}
              </button>
            ))}
          </div>

          {/* 解説エリア */}
          {selectedGovernment && (
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <div className="flex mb-2 gap-1 items-center">
                <img
                  src="/assets/writing-hand.png"
                  alt="icon"
                  className="w-8"
                />
                <h3 className="text-lg font-semibold text-blue-800">
                  {selectedGovernment.label}について
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {selectedGovernment.explanation}
              </p>
            </div>
          )}

          {!selectedGovernment && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-500 text-center">
                政治体制を選択すると、詳しい解説が表示されます
              </p>
            </div>
          )}
          {/* </div>
          </div> */}
        </div>

        {/* 国の説明 */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            国の理念・説明（任意）
          </label>
          <textarea
            value={countryData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="この国はどんな価値観を大切にしますか？"
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  )
}

export default CountryCreator
