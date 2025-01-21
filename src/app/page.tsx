'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Skin Analyzer</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Start Your Skin Analysis</h2>
          <p className="mb-6">
            Get personalized skincare recommendations based on your unique skin profile.
          </p>
          <Link 
            href="/questionnaire"
            className="block w-full bg-primary text-white text-center py-3 rounded-lg hover:opacity-90 transition"
          >
            Begin Analysis
          </Link>
        </div>
      </div>
    </main>
  )
} 