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
  cost: number
  timeToImplement: number
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

// API Request/Response Types
export interface GeneratePolicyRequest {
  countryData: CountryData
  currentStats: CountryStats
  turnNumber: number
  previousPolicies?: string[]
}

export interface GenerateBureaucratMessageRequest {
  countryData: CountryData
  policyIssue: PolicyIssue
  selectedOption?: PolicyOption
  messageType: BureaucratMessage['type']
}
