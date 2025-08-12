import React, { useRef } from 'react'
import { BureaucratMessage } from '../../types'

interface AIBureaucratProps {
  messages: BureaucratMessage[]
  countryName: string
}

const AIBureaucrat: React.FC<AIBureaucratProps> = ({
  messages,
  countryName,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const getMessageTypeInfo = (type: BureaucratMessage['type']) => {
    const typeMap = {
      question: {
        icon: 'question',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
      },
      advice: {
        icon: 'light',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
      },
      warning: {
        icon: 'warning',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
      },
      praise: {
        icon: 'clap',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
      },
      neutral: {
        icon: 'pencil',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        textColor: 'text-gray-800',
      },
    }
    return typeMap[type]
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
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <img src="/assets/robot.png" alt="icon" className="w-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              AI官僚アシスタント
            </h3>
            <p className="text-sm text-gray-600">{countryName}政府顧問</p>
          </div>
        </div>
      </div>

      {/* メッセージ一覧 */}
      <div className="p-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <img
              src="/assets/robot.png"
              alt="icon"
              className="mx-auto w-16 pb-4"
            />
            <p className="text-gray-500 text-sm">
              AI官僚からのメッセージを待っています...
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => {
              const typeInfo = getMessageTypeInfo(message.type)

              return (
                <div
                  key={message.id}
                  className={`border rounded-lg p-3 flex ${typeInfo.borderColor} ${typeInfo.bgColor}`}
                >
                  <img
                    src={`/assets/${typeInfo.icon}.png`}
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <p
                        className={`text-sm ${typeInfo.textColor} leading-relaxed`}
                      >
                        {message.message}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <img src="/assets/light.png" alt="icon" className="w-6" />
            政策決定時にAI官僚が助言します
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">オンライン</span>
          </div>
        </div>
      </div>

      {/* 機能説明 */}
      {messages.length === 0 && (
        <div className="p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              AI官僚の役割
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 政策課題の背景説明</li>
              <li>• 各選択肢のメリット・デメリット解説</li>
              <li>• 政策実行後の結果分析</li>
              <li>• 国政運営に関する助言</li>
            </ul>
          </div>
        </div>
      )}

      {/* クイックアクション */}
      {messages.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2 mt-3">
            <button className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              詳細を教えて
            </button>
            <button className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              リスクは？
            </button>
            <button className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              他の選択肢は？
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※ 現在はβ版のため、ボタンは機能しません
          </p>
        </div>
      )}
    </div>
  )
}

export default AIBureaucrat
