import React from 'react'
import { FlagDesign } from '../../types'

interface CustomFlagPreviewProps {
  flagDesign: FlagDesign
}

const CustomFlagPreview: React.FC<CustomFlagPreviewProps> = ({
  flagDesign,
}) => {
  const baseClasses =
    'w-24 h-16 border-2 border-gray-300 rounded flex items-center justify-center text-xl relative overflow-hidden'

  const getPatternStyle = (): React.CSSProperties => {
    switch (flagDesign.pattern) {
      case 'horizontal':
        return {
          background: `linear-gradient(to right, ${flagDesign.backgroundColor} 50%, ${flagDesign.symbolColor} 50%)`,
        }
      case 'vertical':
        return {
          background: `linear-gradient(to bottom, ${flagDesign.backgroundColor} 50%, ${flagDesign.symbolColor} 50%)`,
        }
      case 'diagonal':
        return {
          background: `linear-gradient(45deg, ${flagDesign.backgroundColor} 50%, ${flagDesign.symbolColor} 50%)`,
        }
      case 'cross':
        return {
          backgroundColor: flagDesign.backgroundColor,
          position: 'relative',
        }
      default:
        return {
          backgroundColor: flagDesign.backgroundColor,
        }
    }
  }

  return (
    <div className={baseClasses} style={getPatternStyle()}>
      {flagDesign.pattern === 'cross' && (
        <>
          <div
            className="absolute inset-y-0 left-1/2 w-2 transform -translate-x-1/2"
            style={{ backgroundColor: flagDesign.symbolColor }}
          />
          <div
            className="absolute inset-x-0 top-1/2 h-2 transform -translate-y-1/2"
            style={{ backgroundColor: flagDesign.symbolColor }}
          />
        </>
      )}
      <img
        src={`/assets/${flagDesign.symbol}.png`}
        alt="symbol"
        className="w-12 z-50"
      />
    </div>
  )
}

export default CustomFlagPreview
