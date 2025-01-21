'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SkinConcern } from '../types'

const skinConcerns: SkinConcern[] = [
  { id: 'wrinkles', name: 'Wrinkles and Fine Lines', selected: false },
  { id: 'eyebags', name: 'Eye Bags', selected: false },
  { id: 'dullness', name: 'Dull Skin', selected: false },
  { id: 'acne', name: 'Acne', selected: false },
  { id: 'darkCircles', name: 'Dark Circles', selected: false },
  { id: 'aging', name: 'Aging', selected: false },
  { id: 'pores', name: 'Visible Pores', selected: false },
  { id: 'hyperpigmentation', name: 'Hyperpigmentation', selected: false },
  { id: 'redness', name: 'Redness', selected: false },
  { id: 'sagging', name: 'Sagging Skin', selected: false },
]

export default function Questionnaire() {
  const router = useRouter()
  const [concerns, setConcerns] = useState<SkinConcern[]>(skinConcerns)

  const toggleConcern = (id: string) => {
    setConcerns(concerns.map(concern =>
      concern.id === id ? { ...concern, selected: !concern.selected } : concern
    ))
  }

  const handleNext = () => {
    router.push('/camera')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">What are your skin concerns?</h1>
      <div className="grid grid-cols-1 gap-3 mb-6">
        {concerns.map(concern => (
          <button
            key={concern.id}
            onClick={() => toggleConcern(concern.id)}
            className={`p-4 rounded-lg border ${
              concern.selected 
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-gray-200 hover:border-primary'
            }`}
          >
            {concern.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition"
      >
        Next
      </button>
    </div>
  )
} 