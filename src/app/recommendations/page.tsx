'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SkinAnalysisResponse } from '../types'

interface Recommendation {
  concern: string
  score: number
  description: string
  searchTerms: string[]
  ingredients: string[]
  usage: string
}

interface RecommendationsResponse {
  recommendations: Recommendation[],
  error?: string
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-500'
  if (score >= 60) return 'text-yellow-500'
  return 'text-red-500'
}

export default function Recommendations() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [error, setError] = useState<string | null>(null)
  const AMAZON_TAG = 'skinguru07-20'

  useEffect(() => {
    let mounted = true

    const getRecommendations = async () => {
      try {
        const analysisData = localStorage.getItem('skinAnalysis')
        if (!analysisData) {
          router.push('/camera')
          return
        }

        const analysis = JSON.parse(analysisData) as SkinAnalysisResponse
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(analysis)
        })

        const data = await response.json() as RecommendationsResponse

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get recommendations')
        }

        if (!data.recommendations) {
          throw new Error('Invalid response format')
        }

        if (mounted) {
          setRecommendations(data.recommendations)
        }
      } catch (error) {
        console.error('Error loading recommendations:', error)
        if (mounted) {
          setError(error instanceof Error ? error.message : 'Failed to load recommendations')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getRecommendations()

    return () => {
      mounted = false
    }
  }, [router])

  const getAmazonSearchUrl = (searchTerm: string) => {
    const encodedSearch = encodeURIComponent(searchTerm)
    return `https://www.amazon.com/s?k=${encodedSearch}&tag=${AMAZON_TAG}`
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => router.push('/analysis')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Back to Analysis
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Analyzing your skin needs...</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Personalized Recommendations</h1>
        
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{rec.concern}</h2>
                <span className={`text-sm font-medium bg-secondary bg-opacity-10 ${getScoreColor(rec.score)} px-2 py-1 rounded-full`}>
                  Score: {rec.score}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{rec.description}</p>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Key Ingredients to Look For:</h3>
                <div className="flex flex-wrap gap-2">
                  {rec.ingredients.map((ingredient, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">How to Use:</h3>
                <p className="text-gray-600 text-sm">{rec.usage}</p>
              </div>

              <div className="space-y-2">
                {rec.searchTerms.map((term, i) => (
                  <a
                    key={i}
                    href={getAmazonSearchUrl(term)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition text-center"
                  >
                    Shop {term} on Amazon
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push('/analysis')}
          className="mt-8 w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Analysis
        </button>
      </div>
    </div>
  )
} 