import React, { useState } from 'react'
import { CitizenVoice } from '../../types'

interface CitizenVoicesProps {
  voices: CitizenVoice[]
}

const CitizenVoices: React.FC<CitizenVoicesProps> = ({ voices }) => {
  const [filterSentiment, setFilterSentiment] = useState<
    'all' | 'positive' | 'negative' | 'neutral'
  >('all')
  const [showAll, setShowAll] = useState(false)

  const getSentimentInfo = (sentiment: CitizenVoice['sentiment']) => {
    const sentimentMap = {
      positive: {
        icon: 'thumbs-up',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        label: '好意的',
      },
      negative: {
        icon: 'thumbs-down',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        label: '否定的',
      },
      neutral: {
        icon: 'profile-icon',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        label: '中立',
      },
    }
    return sentimentMap[sentiment]
  }

  const filteredVoices = voices.filter(
    (voice) => filterSentiment === 'all' || voice.sentiment === filterSentiment,
  )

  const displayedVoices = showAll ? filteredVoices : filteredVoices.slice(0, 3)

  const sentimentCounts = {
    positive: voices.filter((v) => v.sentiment === 'positive').length,
    negative: voices.filter((v) => v.sentiment === 'negative').length,
    neutral: voices.filter((v) => v.sentiment === 'neutral').length,
  }

  const formatTimestamp = (timestamp: string | Date) => {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
      return ''
    }

    return new Intl.DateTimeFormat('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* ヘッダー */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">市民の声</h3>
          <span className="text-sm text-gray-500">{voices.length}件の意見</span>
        </div>
      </div>

      {/* 感情分析サマリー */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <img src="/assets/thumbs-up.png" alt="icon" className="w-8 h-8" />
            <span className="text-sm text-green-600 font-medium">
              {sentimentCounts.positive}
            </span>
            <span className="text-xs text-gray-500">好意的</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/assets/profile-icon.png"
              alt="icon"
              className="w-8 h-8"
            />
            <span className="text-sm text-gray-600 font-medium">
              {sentimentCounts.neutral}
            </span>
            <span className="text-xs text-gray-500">中立</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/thumbs-down.png" alt="icon" className="w-8 h-8" />
            <span className="text-sm text-red-600 font-medium">
              {sentimentCounts.negative}
            </span>
            <span className="text-xs text-gray-500">否定的</span>
          </div>
        </div>
      </div>

      {/* フィルター */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all' as const, label: 'すべて', count: voices.length },
            {
              key: 'positive' as const,
              label: '好意的',
              count: sentimentCounts.positive,
            },
            {
              key: 'neutral' as const,
              label: '中立',
              count: sentimentCounts.neutral,
            },
            {
              key: 'negative' as const,
              label: '否定的',
              count: sentimentCounts.negative,
            },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterSentiment(filter.key)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                filterSentiment === filter.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* 市民の声一覧 */}
      <div className="p-4">
        {displayedVoices.length === 0 ? (
          <div className="text-center py-6">
            <img src="/assets/chat-bubble.png" alt="icon" className="w-8" />
            <p className="text-gray-500 text-sm">
              該当する市民の声がありません
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedVoices.map((voice) => {
              const sentimentInfo = getSentimentInfo(voice.sentiment)

              return (
                <div
                  key={voice.id}
                  className={`border rounded-lg p-3 ${sentimentInfo.borderColor} ${sentimentInfo.bgColor}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-800">
                            {voice.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({voice.age}歳・{voice.occupation})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src={`/assets/${sentimentInfo.icon}.png`}
                            alt="icon"
                            className="w-6"
                          />
                          <span className={`text-xs ${sentimentInfo.color}`}>
                            {sentimentInfo.label}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-sm ${sentimentInfo.color} leading-relaxed mb-2`}
                      >
                        {voice.opinion}
                      </p>

                      <div className="text-xs text-gray-400">
                        {formatTimestamp(voice.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* もっと見るボタン */}
        {filteredVoices.length > 3 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {showAll
                ? `一部を表示 (${filteredVoices.length - 3}件を非表示)`
                : `すべて表示 (あと${filteredVoices.length - 3}件)`}
            </button>
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center">
        <img src="/assets/light.png" alt="icon" className="w-6" />
        <div className="text-xs text-gray-500 text-center">
          市民の声は政策実行後に自動的に生成されます
        </div>
      </div>

      {/* 分析サマリー */}
      {voices.length > 0 && (
        <div className="px-4 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-800 mb-2">世論分析</h4>
            <div className="text-xs text-blue-700">
              {sentimentCounts.positive > sentimentCounts.negative ? (
                <>
                  <div className="flex items-center mb-1">
                    <img
                      src="/assets/checkbox.png"
                      alt="icon"
                      className="w-6"
                    />
                    <p>政策に対する国民の反応は概ね好意的です</p>
                  </div>
                  <p>
                    支持率:{' '}
                    {Math.round(
                      (sentimentCounts.positive / voices.length) * 100,
                    )}
                    %
                  </p>
                </>
              ) : sentimentCounts.negative > sentimentCounts.positive ? (
                <>
                  <div className="flex items-center mb-1">
                    <img src="/assets/warning.png" alt="icon" className="w-6" />
                    <p>政策に対する批判的な声が多く聞かれます</p>
                  </div>
                  <p>
                    反対率:{' '}
                    {Math.round(
                      (sentimentCounts.negative / voices.length) * 100,
                    )}
                    %
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center mb-1">
                    <img
                      src="/assets/thinking.png"
                      alt="icon"
                      className="w-6"
                    />
                    <p>政策に対する国民の意見は分かれています</p>
                  </div>
                  <p>中立的な意見が多い状況です</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CitizenVoices
