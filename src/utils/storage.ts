// Utility functions for localStorage operations
import type { SkinAnalysisResponse, QuestionnaireResponse } from '@/app/types'

export const saveAnalysis = (analysis: SkinAnalysisResponse): void => {
  localStorage.setItem('skinAnalysis', JSON.stringify(analysis))
}

export const getAnalysis = (): SkinAnalysisResponse | null => {
  const data = localStorage.getItem('skinAnalysis')
  return data ? JSON.parse(data) : null
}

export const saveQuestionnaire = (data: QuestionnaireResponse): void => {
  localStorage.setItem('skinQuestionnaire', JSON.stringify(data))
}

export const getQuestionnaire = (): QuestionnaireResponse | null => {
  const data = localStorage.getItem('skinQuestionnaire')
  return data ? JSON.parse(data) : null
}

export const clearStorageData = (): void => {
  localStorage.removeItem('skinAnalysis')
  localStorage.removeItem('skinQuestionnaire')
} 