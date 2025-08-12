import {
  BureaucratMessage,
  CitizenVoice,
  CountryData,
  CountryStats,
  PolicyIssue,
  PolicyOption,
} from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export interface APIResponse<T> {
  success: boolean
  data: T
  timestamp: string
  error?: string
}

// 政策課題生成API呼び出し
export const generatePolicyIssue = async (
  countryData: CountryData,
  currentStats: CountryStats,
  turnNumber: number,
): Promise<PolicyIssue> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generatePolicy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryData,
        currentStats,
        turnNumber,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: APIResponse<PolicyIssue> = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'API call failed')
    }

    return result.data
  } catch (error) {
    console.error('Policy generation API error:', error)
    throw error
  }
}

// AI官僚メッセージ生成API呼び出し
export const generateBureaucratMessage = async (
  countryData: CountryData,
  policyIssue: PolicyIssue,
  messageType: string,
  selectedOption?: PolicyOption,
): Promise<BureaucratMessage> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/generateBureaucratMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countryData,
          policyIssue,
          messageType,
          selectedOption,
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: APIResponse<BureaucratMessage> = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'API call failed')
    }

    return result.data
  } catch (error) {
    console.error('Bureaucrat message API error:', error)
    throw error
  }
}

// 市民の声生成API呼び出し
export const generateCitizenVoices = async (
  policyIssue: PolicyIssue,
  selectedOption: PolicyOption,
  reasoning: string,
  countryData: CountryData,
  currentStats?: CountryStats,
): Promise<CitizenVoice[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generateCitizenVoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        policyIssue,
        selectedOption,
        reasoning,
        countryData,
        currentStats,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: APIResponse<CitizenVoice[]> = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'API call failed')
    }

    return result.data
  } catch (error) {
    console.error('Citizen voices generation API error:', error)
    // エラー時は空の配列を返す
    return []
  }
}
