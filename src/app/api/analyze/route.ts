import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { SkinAnalysisResponse } from '@/app/types'
import { handleApiError } from '@/utils/error'

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
- 0-49: High concern (Significant issue)
- 50-69: Moderate concern (Needs attention)
- 70-89: Minimal/No concern (indicates good skin health with some concerns)
- 90-100: Excellent skin health (No concern)

Lower scores indicate more severe conditions that need more attention.
Higher scores indicate better skin condition in that aspect.

Ensure all metrics are included and accurately scored.`

export async function POST(request: Request) {
  try {
    const { image, questionnaire } = await request.json()
    if (!image) {
      return NextResponse.json(
        { 
          error: handleApiError({
            message: 'No image provided',
            code: 'NO_IMAGE'
          })
        },
        { status: 400 }
      )
    }

    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '')
    console.log("Generating analysis...")
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
    
    // Include questionnaire data in response
    return NextResponse.json({
      ...analysis,
      questionnaire
    })
  } catch (error) {
    console.error('Error analyzing image:', error)
    return NextResponse.json(
      { error: handleApiError(error) },
      { status: 500 }
    )
  }
} 