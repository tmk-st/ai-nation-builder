import React from 'react'
import CustomFlagPreview from './CustomFlagPreview'
import { CountryData, CountryStats, FlagDesign } from '../../types'
import { governmentTypes } from '../../constants'

interface CountryCardProps {
  countryData: CountryData
  flagDesign: FlagDesign
  stats: CountryStats
  showStats?: boolean
  className?: string
}

const CountryCard: React.FC<CountryCardProps> = ({
  countryData,
  flagDesign,
  stats,
  showStats = false,
  className = '',
}) => {
  /*
   * 政治体制の名称を取得
   */
  const getGovernmentLabel = (val: string) => {
    const governmentType = governmentTypes.find((type) => type.value === val)
    return governmentType ? governmentType.label : null
  }

  const getStatColor = (value: number): string => {
    if (value >= 80) return 'text-green-600'
    if (value >= 60) return 'text-blue-600'
    if (value >= 40) return 'text-yellow-600'
    if (value >= 20) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatBarColor = (value: number): string => {
    if (value >= 80) return 'bg-green-500'
    if (value >= 60) return 'bg-blue-500'
    if (value >= 40) return 'bg-yellow-500'
    if (value >= 20) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const StatBar: React.FC<{ label: string; value: number; icon: string }> = ({
    label,
    value,
    icon,
  }) => (
    <div className="flex items-center space-x-3">
      <img src={`/assets/${icon}.png`} alt="icon" className="w-6" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className={`text-sm font-bold ${getStatColor(value)}`}>
            {value}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStatBarColor(
              value,
            )}`}
            style={{ width: `${Math.max(value, 0)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {/* ヘッダー部分 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CustomFlagPreview flagDesign={flagDesign} />
            <div>
              <h2 className="text-2xl font-bold">{countryData.name}</h2>
            </div>
          </div>
        </div>

        {countryData.description && (
          <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg">
            <p className="text-sm italic">{countryData.description}</p>
          </div>
        )}
      </div>

      {/* 統計情報（オプション） */}
      {showStats && (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            国家指標
          </h3>
          <div className="space-y-4">
            <StatBar label="幸福度" value={stats.happiness} icon="happiness" />
            <StatBar label="経済" value={stats.economy} icon="money" />
            <StatBar label="環境" value={stats.environment} icon="tree" />
            <StatBar label="治安" value={stats.security} icon="safety" />
          </div>

          {/* 総合評価 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">総合評価</span>
              <div className="flex items-center space-x-2">
                {(() => {
                  const average = Math.round(
                    (stats.happiness +
                      stats.economy +
                      stats.environment +
                      stats.security) /
                      4,
                  )
                  const stars = Math.ceil(average / 20)
                  return (
                    <>
                      <div>
                        {Array.from(
                          { length: Math.max(1, Math.min(5, stars)) },
                          (_, index) => (
                            <img
                              key={index}
                              src="/assets/star.png"
                              alt="star"
                              className="inline w-6"
                            />
                          ),
                        )}
                      </div>
                      <span className={`font-bold ${getStatColor(average)}`}>
                        {average}/100
                      </span>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 基本情報のみの場合 */}
      {!showStats && (
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">政治体制:</span>
              <span className="font-medium">
                {getGovernmentLabel(countryData.government)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">人口:</span>
              <span className="font-medium">
                {countryData.population.toLocaleString()}人
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CountryCard
