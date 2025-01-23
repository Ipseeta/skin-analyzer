'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { clearStorageData } from '@/utils/storage'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    clearStorageData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Skin Analysis</h1>
        <p className="text-gray-600 mb-8">
          Get personalized skincare recommendations based on AI analysis
        </p>
        
        <button
          onClick={() => router.push('/questionnaire')}
          className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          Start Analysis
        </button>
      </div>
    </div>
  )
} 