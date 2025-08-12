import React from 'react'
import { CountryStats } from '../../types'

interface ScoreDashboardProps {
  stats: CountryStats
  turnNumber: number
  budget: number
}

const ScoreDashboard: React.FC<ScoreDashboardProps> = ({
  stats,
  turnNumber,
  budget,
}) => {
  const statItems = [
    {
      key: 'happiness' as keyof CountryStats,
      label: '国民幸福度',
      icon: 'happiness',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      barColor: 'bg-pink-500',
    },
    {
      key: 'economy' as keyof CountryStats,
      label: '経済状況',
      icon: 'money',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      barColor: 'bg-yellow-500',
    },
    {
      key: 'environment' as keyof CountryStats,
      label: '環境指標',
      icon: 'tree',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      barColor: 'bg-emerald-500',
    },
    {
      key: 'security' as keyof CountryStats,
      label: '治安・安全',
      icon: 'safety',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      barColor: 'bg-blue-500',
    },
    {
      key: 'education' as keyof CountryStats,
      label: '教育水準',
      icon: 'education',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      barColor: 'bg-purple-500',
    },
    {
      key: 'healthcare' as keyof CountryStats,
      label: '医療福祉',
      icon: 'medication',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      barColor: 'bg-red-500',
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreStatus = (score: number) => {
    if (score >= 80) return '優秀'
    if (score >= 60) return '良好'
    if (score >= 40) return '普通'
    return '改善要'
  }

  const averageScore = Math.round(
    Object.values(stats).reduce((sum, value) => sum + value, 0) /
      Object.values(stats).length,
  )

  const formatBudget = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`
    }
    return amount.toString()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* ヘッダー */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          国家指標ダッシュボード
        </h3>
      </div>

      <div className="p-4">
        {/* 総合スコア */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold mb-2">
            {averageScore}
          </div>
          <div className="text-sm text-gray-600">
            総合スコア ({getScoreStatus(averageScore)})
          </div>
        </div>

        {/* 基本情報 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="justify-center p-3 bg-gray-50 rounded-lg flex items-center gap-1">
            <div className="text-sm text-gray-600">第</div>
            <div className="text-xl font-bold text-gray-800">{turnNumber}</div>
            <div className="text-sm text-gray-600">期</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">予算</div>
            <div className="text-lg font-bold text-gray-800">
              ¥{formatBudget(budget)}
            </div>
            <div
              className={`text-sm ${budget < 100000 ? 'text-red-600' : 'text-gray-600'}`}
            >
              {budget < 100000 ? '残高注意' : ''}
            </div>
          </div>
        </div>

        {/* 各指標 */}
        <div className="space-y-4">
          {statItems.map((item) => {
            const value = stats[item.key]
            return (
              <div key={item.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`/assets/${item.icon}.png`}
                      alt="icon"
                      className="w-8"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${getScoreColor(value)}`}>
                    {value}
                  </span>
                </div>

                {/* プログレスバー */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${item.barColor}`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>

                {/* ステータス表示 */}
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${item.bgColor} ${item.color}`}
                  >
                    {getScoreStatus(value)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* アドバイス */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <img src="/assets/light.png" alt="icon" className="w-6" />
            <div>
              <div className="text-sm font-medium text-blue-800 mb-1">
                改善提案
              </div>
              <div className="text-xs text-blue-700">
                {averageScore >= 80
                  ? '素晴らしい統治をされています！この調子で続けましょう。'
                  : averageScore >= 60
                    ? '概ね良好ですが、低い指標の改善を検討してみてください。'
                    : averageScore >= 40
                      ? '一部の分野で課題があります。バランスの取れた政策を心がけましょう。'
                      : '複数の分野で改善が必要です。優先順位を決めて集中的に取り組みましょう。'}
              </div>
            </div>
          </div>
        </div>

        {/* 予算警告 */}
        {budget < 200000 && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <img src="/assets/warning.png" alt="icon" className="w-6" />
              <div>
                <div className="text-sm font-medium text-red-800 mb-1">
                  予算警告
                </div>
                <div className="text-xs text-red-700">
                  予算が不足しています。コストの低い政策を選択するか、
                  経済政策で収入を増やすことを検討してください。
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScoreDashboard
