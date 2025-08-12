// 国家データの基本情報
export interface CountryData {
  id?: string
  name: string
  population: number
  government: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

// 国家の統計情報
export interface CountryStats {
  happiness: number // 0-100
  economy: number // 0-100
  environment: number // 0-100
  security: number // 0-100
  education?: number // 0-100
  healthcare?: number // 0-100
}

// 国旗デザイン設定
export interface FlagDesign {
  id?: string
  backgroundColor: string
  pattern: 'horizontal' | 'vertical' | 'diagonal' | 'cross' | 'solid'
  symbolColor: string
  symbol: string
}

// 政策課題
export interface PolicyIssue {
  id: string
  title: string
  description: string
  category:
    | 'economy'
    | 'environment'
    | 'social'
    | 'security'
    | 'education'
    | 'healthcare'
  difficulty: 'easy' | 'medium' | 'hard'
  impact: {
    happiness?: number
    economy?: number
    environment?: number
    security?: number
    education?: number
    healthcare?: number
  }
  options: PolicyOption[]
  createdAt: Date
}

// 政策選択肢
export interface PolicyOption {
  id: string
  title: string
  description: string
  consequences: string
  cost: number // 予算コスト
  timeToImplement: number // 実装期間（月）
  impact: {
    happiness?: number
    economy?: number
    environment?: number
    security?: number
    education?: number
    healthcare?: number
  }
}

// AI官僚の発言
export interface BureaucratMessage {
  id: string
  type: 'question' | 'advice' | 'warning' | 'praise' | 'neutral'
  message: string
  timestamp: Date
  policyIssueId?: string
}

// 市民の声
export interface CitizenVoice {
  id: string
  name: string
  age: number
  occupation: string
  opinion: string
  sentiment: 'positive' | 'negative' | 'neutral'
  policyIssueId: string
  timestamp: Date
}

// ゲームセッション
export interface GameSession {
  id: string
  countryId: string
  playerId: string
  currentPolicyIssueId?: string
  stats: CountryStats
  startedAt: Date
  lastActivityAt: Date
  turnNumber: number
  budget: number
  completedPolicies: string[] // PolicyIssue IDsの配列
  achievements: Achievement[]
}

// 実績・アチーブメント
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
  condition: {
    type: 'stat_threshold' | 'policy_count' | 'turn_count' | 'special_event'
    target: number | string
    value?: number
  }
}
