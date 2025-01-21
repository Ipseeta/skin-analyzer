'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SkinAnalysis } from '../types'

export default function Analysis() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<SkinAnalysis>({
    overallScore: 0,
    metrics: [] // Initialize with empty array
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const storedAnalysis = localStorage.getItem('skinAnalysis')
      if (!storedAnalysis) {
        setError('No analysis data found')
        return
      }
      
      const parsedAnalysis = JSON.parse(storedAnalysis)
      setAnalysis(parsedAnalysis)
    } catch (err) {
      setError('Failed to load analysis data')
      console.error('Error loading analysis:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Skin Analysis Results</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Overall Score</h2>
            <span className="text-2xl font-bold text-primary">
              {analysis.overallScore}/100
            </span>
          </div>
          
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${analysis.overallScore}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {analysis.metrics?.map((metric) => (
            <div key={metric.name} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{metric.name}</span>
                <span className="text-sm font-semibold">{metric.score}/100</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary"
                  style={{ width: `${metric.score}%` }}
                ></div>
              </div>
            </div>
          ))}
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