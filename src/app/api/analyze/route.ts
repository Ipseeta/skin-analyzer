import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { SkinAnalysisResponse } from '@/app/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const ANALYSIS_PROMPT = `You are a skin analysis expert. Analyze the facial skin image and provide a JSON response in exactly this format:
{
  "metrics": {
    "darkCircles": <0-100>,
    "smoothness": <0-100>,
    "unevenSkintone": <0-100>,
    "radiance": <0-100>,
    "dullSkin": <0-100>,
    "skinShine": <0-100>,
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
}

Score severity of each concern from 0-100 where:
- 0-49: Minimal/No concern (Good condition)
- 50-69: Moderate concern (Needs attention)
- 70-89: High concern (Significant issue)
- 90-100: Severe concern (Critical issue)

Higher scores indicate more severe conditions that need more attention.
Lower scores indicate better skin condition in that aspect.

For the overall skin health score:
- Higher score (80-100) indicates excellent skin health
- Medium score (60-79) indicates good skin health with some concerns
- Lower score (0-59) indicates multiple skin concerns needing attention

Calculate overall score as: 100 - (average of concern scores)
This way, lower concern scores result in a higher overall health score.

Ensure all metrics are included and accurately scored.`

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