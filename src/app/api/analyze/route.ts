import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { SkinAnalysisResponse } from '@/app/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const ANALYSIS_PROMPT = `You are a skin analysis expert. Analyze the facial skin image and provide a JSON response in exactly this format:
{
  "metrics": {
    "hyperpigmentation": <0-100>,
    "melasma": <0-100>,
    "eyebags": <0-100>,
    "redness": <0-100>,
    "texture": <0-100>,
    "wrinkles": <0-100>,
    "skinSagging": <0-100>,
    "darkSpots": <0-100>,
    "freckles": <0-100>
  },
  "overallScore": <0-100>
}`

export async function POST(request: Request) {
  try {
    const { image } = await request.json()
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '')
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: ANALYSIS_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this facial skin image.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" }
    })

    const analysisContent = response.choices[0].message.content
    if (!analysisContent) {
      throw new Error('No analysis content received')
    }

    const analysis = JSON.parse(analysisContent) as SkinAnalysisResponse
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error analyzing image:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    return NextResponse.json(
      { error: 'Failed to analyze image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 