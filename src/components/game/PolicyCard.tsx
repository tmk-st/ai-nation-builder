import React from 'react'
import { PolicyIssue } from '../../types'

interface PolicyCardProps {
  policyIssue: PolicyIssue
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policyIssue }) => {
  const getCategoryInfo = (category: PolicyIssue['category']) => {
    const categoryMap = {
      economy: {
        icon: 'money',
        label: '経済政策',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
      },
      environment: {
        icon: 'tree',
        label: '環境政策',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
      },
      social: {
        icon: 'people',
        label: '社会政策',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
      },
      security: {
        icon: 'safety',
        label: '安全保障',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
      },
      education: {
        icon: 'education',
        label: '教育政策',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
      },
      healthcare: {
        icon: 'medication',
        label: '医療政策',
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
      },
    }
    return categoryMap[category]
  }

  const getDifficultyInfo = (difficulty: PolicyIssue['difficulty']) => {
    const difficultyMap = {
      easy: {
        label: '標準',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        count: 1,
      },
      medium: {
        label: '複雑',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        count: 2,
      },

      hard: {
        label: '困難',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        count: 3,
      },
    }
    return difficultyMap[difficulty]
  }

  const categoryInfo = getCategoryInfo(policyIssue.category)
  const difficultyInfo = getDifficultyInfo(policyIssue.difficulty)

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-4 ${categoryInfo.borderColor} overflow-hidden`}
    >
      {/* ヘッダー */}
      <div
        className={`px-6 py-4 ${categoryInfo.bgColor} border-b border-gray-200`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={`/assets/${categoryInfo.icon}.png`}
              alt="icon"
              className="w-8"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {policyIssue.title}
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <span
                  className={`text-sm px-2 py-1 rounded-full ${categoryInfo.bgColor} ${categoryInfo.color}`}
                >
                  {categoryInfo.label}
                </span>
                <div className='flex'>
                {Array.from({ length: difficultyInfo.count }).map((_, i) => (
                  <img
                    key={i}
                    src="/assets/star.png"
                    alt="icon"
                    className="w-6 h-6"
                  />
                ))}
                  </div>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${difficultyInfo.bgColor} ${difficultyInfo.color}`}
                >
                  {difficultyInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 課題説明 */}
      <div className="px-6 py-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            現在の状況
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {policyIssue.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PolicyCard
