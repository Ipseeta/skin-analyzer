'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Webcam from 'react-webcam'
import type { QuestionnaireResponse } from '../types'
import { saveAnalysis, getQuestionnaire } from '@/utils/storage'
import { createErrorState, ApiError } from '@/utils/error'

export default function Camera() {
  const router = useRouter()
  const webcamRef = useRef<Webcam>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [error, setError] = useState<ApiError | null>(null)

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setCapturedImage(imageSrc)
    }
  }, [webcamRef])

  const retake = () => {
    setCapturedImage(null)
  }

  const handleNext = async () => {
    if (capturedImage) {
      try {
        const questionnaire = getQuestionnaire()
        const base64Image = capturedImage.split(',')[1] || capturedImage

        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            image: base64Image,
            questionnaire
          }),
        })

        if (!response.ok) {
          throw new Error('Analysis failed')
        }

        const analysis = await response.json()
        saveAnalysis(analysis)
        router.push('/analysis')
      } catch (error) {
        const errorState = createErrorState(error)
        setError(errorState.error)
      }
    }
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500 mb-6">{error.message}</p>
          <button
            onClick={() => setError(null)}
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
        <h1 className="text-2xl font-bold mb-6">Take a Selfie</h1>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {!capturedImage ? (
            <div className="relative">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
                videoConstraints={{
                  facingMode: 'user',
                  width: 720,
                  height: 720,
                }}
              />
              <button
                onClick={capture}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition"
              >
                Capture
              </button>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full rounded-lg"
              />
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={retake}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Retake
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Please ensure:</p>
          <ul className="mt-2">
            <li>• Good lighting conditions</li>
            <li>• Face is clearly visible</li>
            <li>• No makeup for best results</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 