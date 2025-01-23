// Utility functions for formatting and text manipulation

export const formatMetricName = (name: string): string => {
  return name
    .split(/(?=[A-Z])|_/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim()
}

export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500'  // Excellent health
  if (score >= 70) return 'bg-blue-500'   // Good health
  if (score >= 50) return 'bg-yellow-500' // Moderate concern
  return 'bg-red-500'    // Needs attention
}

export const getTextScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-500'
  if (score >= 70) return 'text-blue-500'
  if (score >= 50) return 'text-yellow-500'
  return 'text-red-500'
}

export const getMetricDescription = (score: number): string => {
  if (score >= 90) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 50) return 'Moderate'
  return 'Needs Attention'
} 