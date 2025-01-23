import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { SkinAnalysisResponse } from '@/app/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const RECOMMENDATION_PROMPT = `You are a skincare expert API. Analyze these skin metrics and provide targeted recommendations.
Consider the user's questionnaire responses (User Profile data) for more personalized recommendations.

ALWAYS respond with a JSON object containing a "recommendations" array. Each recommendation must follow this structure:
{
  "recommendations": [
    {
      "concern": "concern name",
      "score": <numeric_score>,
      "description": "detailed explanation",
      "searchTerms": ["product suggestions"],
      "ingredients": ["key ingredients"],
      "usage": "application instructions"
    }
  ]
}

Common skin concerns and their treatments:
- Dark Circles: Vitamin K, caffeine, peptides, retinol
- Smoothness: Gentle exfoliants, hyaluronic acid, ceramides
- Uneven Skintone: Vitamin C, niacinamide, alpha arbutin
- Radiance: AHA/BHA, vitamin C, niacinamide
- Skin Shine: Mattifying ingredients, niacinamide, salicylic acid
- Hyperpigmentation: Vitamin C, kojic acid, niacinamide, alpha arbutin
- Melasma: Tranexamic acid, kojic acid, vitamin C, sunscreen
- Eyebags: Caffeine, peptides, vitamin K
- Redness: Centella asiatica, green tea, aloe, niacinamide
- Texture: AHA/BHA exfoliants, glycolic acid, lactic acid
- Wrinkles: Retinol, peptides, hyaluronic acid, collagen
- Skin Sagging: Peptides, retinol, collagen boosters
- Dark Spots: Vitamin C, alpha arbutin, licorice root
- Freckles: Vitamin C, niacinamide, sunscreen

Provide specific product recommendations for each concern and usage instructions.
Return ONLY valid JSON with no additional text.`

export async function POST(request: Request) {
  try {
    const analysis: SkinAnalysisResponse = await request.json()

    if (!analysis?.metrics) {
      return NextResponse.json(
        { error: 'Invalid analysis data' },
        { status: 400 }
      )
    }
    console.log("Generating recommendations...")
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: RECOMMENDATION_PROMPT
        },
        {
          role: "user",
          content: `Generate recommendations based on:
            Skin Metrics: ${JSON.stringify(analysis.metrics)}
            User Profile: ${JSON.stringify(analysis.questionnaire)}
          `
        }
      ],
      temperature: 0.1,
      max_tokens: 2000
    })

    const content = response.choices[0].message.content

    if (!content) {
      throw new Error('No content in OpenAI response')
    }

    let parsedContent: any
    try {
      parsedContent = JSON.parse(content.trim())
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Invalid JSON content:', content)
      return NextResponse.json(
        { error: 'Failed to parse JSON response', details: content },
        { status: 500 }
      )
    }

    // Validate response structure
    if (!parsedContent?.recommendations?.length) {
      // If no recommendations, return empty array instead of error
      return NextResponse.json({ recommendations: [] })
    }

    return NextResponse.json(parsedContent)
  } catch (error) {
    console.error('Error details:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate recommendations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 