import React, { useState } from 'react'
import { PolicyIssue, PolicyOption } from '../../types'
import Button from '../common/Button'

interface PolicyInputProps {
  policyIssue: PolicyIssue
  onDecision: (optionId: string, reasoning: string) => void
  isLoading: boolean
}

const PolicyInput: React.FC<PolicyInputProps> = ({
  policyIssue,
  onDecision,
  isLoading,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('')
  const [reasoning, setReasoning] = useState<string>('')
  const [showAdvancedForm, setShowAdvancedForm] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOptionId) return

    onDecision(selectedOptionId, reasoning)
  }

  const selectedOption = policyIssue.options.find(
    (opt) => opt.id === selectedOptionId,
  )

  const formatImpact = (impact: PolicyOption['impact']) => {
    return Object.entries(impact)
      .filter(([, value]) => value !== 0)
      .map(([key, value]) => {
        const labels: { [key: string]: { label: string; icon: string } } = {
          happiness: { label: '幸福度', icon: 'happiness' },
          economy: { label: '経済', icon: 'money' },
          environment: { label: '環境', icon: 'tree' },
          security: { label: '治安', icon: 'safety' },
          education: { label: '教育', icon: 'education' },
          healthcare: { label: '医療', icon: 'medication' },
        }

        const sign = (value as number) > 0 ? '+' : ''
        const color = (value as number) > 0 ? 'text-green-600' : 'text-red-600'

        return (
          <div key={key} className="flex items-center space-x-2">
            <img
              src={`/assets/${labels[key]?.icon}.png`}
              alt="icon"
              className="w-6"
            />
            <span className="text-sm text-gray-600">{labels[key]?.label}:</span>
            <span className={`text-sm font-medium ${color}`}>
              {sign}
              {value}
            </span>
          </div>
        )
      })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 pt-4">
        <div className="flex gap-2 items-center">
          <img src="/assets/voting.png" alt="icon" className="w-8" />
          <h3 className="text-lg font-semibold text-gray-800">政策決定</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          以下の選択肢から政策を選択し、必要に応じて理由を記入してください
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* 政策選択肢 */}
        <div className="space-y-4 mb-6">
          {policyIssue.options.map((option, index) => (
            <div
              key={option.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedOptionId === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedOptionId(option.id)}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="radio"
                  name="policyOption"
                  value={option.id}
                  checked={selectedOptionId === option.id}
                  onChange={(e) => setSelectedOptionId(e.target.value)}
                  className="mt-1 text-blue-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-base font-medium text-gray-800">
                      {index + 1}. {option.title}
                    </h5>
                    <div className="flex">
                      <img src="/assets/money.png" alt="icon" className="w-5" />
                      <div className="text-sm text-gray-500">
                        ¥{option.cost.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {option.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-gray-500">実装期間:</span>
                      <span className="text-sm text-gray-700 ml-2">
                        {option.timeToImplement}ヶ月
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">結果:</span>
                      <span className="text-sm text-gray-700 ml-2">
                        {option.consequences}
                      </span>
                    </div>
                  </div>

                  {/* 影響予測 */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {formatImpact(option.impact)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 選択した政策の詳細 */}
        {selectedOption && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex mb-2 items-center">
              <img src="/assets/checkbox.png" alt="icon" className="w-6" />
              <h4 className="text-sm font-semibold text-blue-800">
                選択中: {selectedOption.title}
              </h4>
            </div>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                <strong>コスト:</strong> ¥{selectedOption.cost.toLocaleString()}
              </p>
              <p>
                <strong>実装期間:</strong> {selectedOption.timeToImplement}ヶ月
              </p>
              <p>
                <strong>予想結果:</strong> {selectedOption.consequences}
              </p>
            </div>
          </div>
        )}

        {/* 注意事項 */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <img src="/assets/warning.png" alt="icon" className="w-8" />
            <p className="text-xs text-yellow-700">
              選択した政策は即座に実行され、国家指標に影響を与えます。
              慎重に検討し、国民の利益を最優先に判断してください。
              予算不足の場合、政策実行ができない可能性があります。
            </p>
          </div>
        </div>

        {/* 高度な入力フォーム */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">
              政策決定の理由 (任意)
            </h4>
            <button
              type="button"
              onClick={() => setShowAdvancedForm(!showAdvancedForm)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showAdvancedForm ? '簡単入力に戻る' : '詳細入力'}
            </button>
          </div>

          {showAdvancedForm ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  なぜこの政策を選択しますか？
                </label>
                <textarea
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  placeholder="政策選択の理由を詳しく説明してください。AI官僚がより具体的なアドバイスを提供できます。"
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              <div className="flex items-center">
                <img src="/assets/light.png" alt="icon" className="w-6" />
                <div className="text-xs text-gray-500">
                  詳細な理由を記入すると、AI官僚からより具体的なフィードバックを受けられます
                </div>
              </div>
            </div>
          ) : (
            <div>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                placeholder="簡単に政策選択の理由を記入してください（任意）"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
            </div>
          )}
        </div>

        {/* 実行ボタン */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {selectedOption && (
              <span>
                実行後予算: ¥{(1000000 - selectedOption.cost).toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setSelectedOptionId('')
                setReasoning('')
              }}
              disabled={isLoading}
            >
              リセット
            </Button>

            <Button
              type="submit"
              disabled={!selectedOptionId || isLoading}
              className={`${
                !selectedOptionId || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              } px-6 py-2`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>実行中...</span>
                </div>
              ) : (
                <>政策を実行する</>
              )}
            </Button>
          </div>
        </div>

        {/* 警告メッセージ */}
        {selectedOption && selectedOption.cost > 500000 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <img src="/assets/warning.png" alt="icon" className="w-8" />
              <div className="text-sm text-yellow-700">
                <strong>高額な政策です:</strong>{' '}
                この政策は予算の大部分を消費します。
                後の政策実行に影響する可能性があります。
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default PolicyInput
