import React from 'react'
import CustomFlagPreview from './CustomFlagPreview'
import { FlagDesign } from '../../types'
import { flagColors, flagPatterns } from '../../constants'

interface FlagGeneratorProps {
  flagDesign: FlagDesign
  onChange: (flagDesign: FlagDesign) => void
}

const FlagGenerator: React.FC<FlagGeneratorProps> = ({
  flagDesign,
  onChange,
}) => {
  // シンボルの選択肢
  const symbols = [
    'star',
    'clover',
    'wave',
    'swords',
    'rainbow',
    'flower',
    'ribbon',
    'thunder',
    'fire',
    'diamond',
    'cat',
    'crown',
    'eagle',
    'snow-flake',
    'sun',
    'dragon',
  ]

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        国旗をデザインしよう
      </h3>

      <div className="space-y-6">
        {/* プレビュー */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">プレビュー:</span>
          <CustomFlagPreview flagDesign={flagDesign} />
        </div>

        {/* 背景色選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            背景色
          </label>
          <div className="grid grid-cols-6 gap-2">
            {flagColors.map((color) => (
              <button
                key={color.value}
                onClick={() => {
                  const newFlag = {
                    ...flagDesign,
                    backgroundColor: color.value,
                  }
                  onChange(newFlag)
                }}
                className={`w-16 h-12 rounded border-2 ${
                  flagDesign.backgroundColor === color.value
                    ? 'border-gray-800 scale-110'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* パターン選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            パターン
          </label>
          <div className="grid grid-cols-5 gap-2">
            {flagPatterns.map((pattern) => (
              <button
                key={pattern.value}
                onClick={() => {
                  const newFlag = {
                    ...flagDesign,
                    pattern: pattern.value as FlagDesign['pattern'],
                  }
                  onChange(newFlag)
                }}
                className={`px-3 py-2 text-xs rounded border ${
                  flagDesign.pattern === pattern.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {pattern.label}
              </button>
            ))}
          </div>
        </div>

        {/* シンボル選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            シンボル
          </label>
          <div className="grid grid-cols-8 gap-2 flex">
            {symbols.map((symbol, index) => (
              <button
                key={index}
                onClick={() => {
                  const newFlag = { ...flagDesign, symbol }
                  onChange(newFlag)
                }}
                className={`border-2 ${
                  flagDesign.symbol === symbol
                    ? 'border-gray-800'
                    : 'border-gray-300'
                }`}
              >
                <img
                  src={`/assets/${symbol}.png`}
                  alt="icon"
                  className="w-12 h-12 mx-auto"
                />
              </button>
            ))}
          </div>
        </div>

        {/* シンボル色選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            アクセント色
          </label>
          <div className="grid grid-cols-6 gap-2">
            {flagColors.map((color) => (
              <button
                key={color.value}
                onClick={() => {
                  const newFlag = {
                    ...flagDesign,
                    symbolColor: color.value,
                    textColor: color.value,
                  }
                  onChange(newFlag)
                }}
                className={`w-16 h-12 rounded border-2 ${
                  flagDesign.symbolColor === color.value
                    ? 'border-gray-800 scale-110'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlagGenerator
