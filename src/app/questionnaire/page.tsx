'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { QuestionnaireResponse } from '../types'

const SKIN_CONCERNS = [
  'Acne', 'Aging', 'Blackheads', 'Dryness', 'Large Pores',
  'Oiliness', 'Sensitivity', 'Sun Damage', 'Uneven Tone'
]

const COMMON_ALLERGIES = [
  'Fragrance', 'Essential Oils', 'Salicylic Acid',
  'Benzoyl Peroxide', 'Retinol', 'None'
]

export default function Questionnaire() {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<QuestionnaireResponse>>({
    skinType: undefined,
    sensitivity: undefined,
    concerns: [],
    allergies: [],
    lifestyle: {
      sunExposure: 'medium',
      stress: 'medium',
      sleep: 'fair',
      diet: 'balanced'
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save questionnaire data to localStorage
    localStorage.setItem('skinQuestionnaire', JSON.stringify(formData))
    
    // Proceed to camera for skin analysis
    router.push('/camera')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Skin Assessment</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skin Type */}
            <div className="space-y-2">
              <label className="text-lg font-semibold">What's your skin type?</label>
              <select
                className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.skinType}
                onChange={(e) => setFormData({
                  ...formData,
                  skinType: e.target.value as QuestionnaireResponse['skinType']
                })}
                required
              >
                <option value="">Select skin type</option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="combination">Combination</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            {/* Skin Concerns */}
            <div className="space-y-2">
              <label className="text-lg font-semibold">Select your skin concerns:</label>
              <div className="grid grid-cols-2 gap-3">
                {SKIN_CONCERNS.map(concern => (
                  <label key={concern} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={formData.concerns?.includes(concern)}
                      onChange={(e) => {
                        const concerns = formData.concerns || []
                        setFormData({
                          ...formData,
                          concerns: e.target.checked
                            ? [...concerns, concern]
                            : concerns.filter(c => c !== concern)
                        })
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{concern}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="space-y-2">
              <label className="text-lg font-semibold">Any allergies or sensitivities?</label>
              <div className="grid grid-cols-2 gap-3">
                {COMMON_ALLERGIES.map(allergy => (
                  <label key={allergy} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={formData.allergies?.includes(allergy)}
                      onChange={(e) => {
                        const allergies = formData.allergies || []
                        setFormData({
                          ...formData,
                          allergies: e.target.checked
                            ? [...allergies, allergy]
                            : allergies.filter(a => a !== allergy)
                        })
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{allergy}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Lifestyle Factors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Lifestyle Factors</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sun Exposure</label>
                <select
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.lifestyle?.sunExposure}
                  onChange={(e) => setFormData({
                    ...formData,
                    lifestyle: {
                      ...formData.lifestyle!,
                      sunExposure: e.target.value as 'high' | 'medium' | 'low'
                    }
                  })}
                >
                  <option value="low">Low (Indoor most of the time)</option>
                  <option value="medium">Medium (Regular outdoor activities)</option>
                  <option value="high">High (Frequent sun exposure)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sleep Quality</label>
                <select
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.lifestyle?.sleep}
                  onChange={(e) => setFormData({
                    ...formData,
                    lifestyle: {
                      ...formData.lifestyle!,
                      sleep: e.target.value as 'good' | 'fair' | 'poor'
                    }
                  })}
                >
                  <option value="good">Good (7-9 hours)</option>
                  <option value="fair">Fair (5-7 hours)</option>
                  <option value="poor">Poor (Less than 5 hours)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition mt-8"
            >
              Continue to Skin Analysis
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Your responses help us provide more accurate recommendations</p>
        </div>
      </div>
    </div>
  )
} 