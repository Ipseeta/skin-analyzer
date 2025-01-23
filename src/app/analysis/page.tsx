'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SkinAnalysisResponse } from '../types'

export default function Analysis() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<SkinAnalysisResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('skinAnalysis')
    if (data) {
      setAnalysis(JSON.parse(data))
    }
    setLoading(false)
  }, [])

  const getInvertedScore = (score: number) => 100 - score
  const getScoreColor = (score: number, isOverall = false) => {
    const displayScore = isOverall ? score : getInvertedScore(score)
    return displayScore >= 80
      ? 'bg-green-500'  // Excellent condition
      : displayScore >= 60
      ? 'bg-yellow-500' // Good condition with some concerns
      : 'bg-red-500'    // Needs attention
  }

  const getTextColor = (score: number, isOverall = false) => {
    const displayScore = isOverall ? score : getInvertedScore(score)
    return displayScore >= 80
      ? 'text-green-500'  // Excellent condition
      : displayScore >= 60
      ? 'text-yellow-500' // Good condition with some concerns
      : 'text-red-500'    // Needs attention
  }

  if (loading || !analysis) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Analyzing Results...</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => router.push('/camera')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const metricEntries = Object.entries(analysis.metrics)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Skin Analysis Results</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Overall Skin Health</h2>
            <span className={`text-2xl font-bold ${getTextColor(analysis.overallScore, true)}`}>
              {analysis.overallScore}/100
            </span>
          </div>
          
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreColor(analysis.overallScore, true)}`}
              style={{ width: `${analysis.overallScore}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Higher score indicates better overall skin health
          </p>
        </div>

        <div className="space-y-4">
          {metricEntries.map(([name, score]) => {
            const invertedScore = getInvertedScore(score)
            return (
              <div key={name} className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">
                    {name
                      .split(/(?=[A-Z])|_/)
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                      .trim()}
                  </span>
                  <span className={`text-sm font-semibold ${getTextColor(score)}`}>
                    {invertedScore}/100
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreColor(score)}`}
                    style={{ width: `${invertedScore}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Higher score indicates better condition
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => router.push('/recommendations')}
            className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            View Recommendations
          </button>
          
          <button
            onClick={() => router.push('/camera')}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Take Another Photo
          </button>
        </div>
      </div>
    </div>
  )
}