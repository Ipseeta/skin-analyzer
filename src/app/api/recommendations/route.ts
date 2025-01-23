import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { SkinAnalysisResponse } from '@/app/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const RECOMMENDATION_PROMPT = `You are a skincare expert API. Your task is to analyze skin metrics and provide product recommendations.

ALWAYS respond with a JSON object containing a "recommendations" array. Each recommendation must follow this structure:

{
  "recommendations": [
    {
      "concern": "hyperpigmentation",
      "score": 75,
      "description": "Dark spots and uneven skin tone that need brightening treatments",
      "searchTerms": ["vitamin c serum", "kojic acid cream"],
      "ingredients": ["vitamin c", "niacinamide", "kojic acid"],
      "usage": "Apply serum in the morning after cleansing, follow with sunscreen"
    }
  ]
}

Create a recommendation object for each skin concern. Common skin concerns and their treatments:
- Hyperpigmentation: Vitamin C, kojic acid, niacinamide
- Wrinkles: Retinol, peptides, hyaluronic acid
- Texture: AHA/BHA exfoliants, glycolic acid
- Redness: Centella asiatica, green tea, aloe
- Dryness: Ceramides, hyaluronic acid, squalane

Return ONLY valid JSON with no additional text.`

export async function POST(request: Request) {
  try {
    const analysis: SkinAnalysisResponse = await request.json()
    console.log('Analysis from recommendations API:', analysis)

    if (!analysis?.metrics) {
      return NextResponse.json(
        { error: 'Invalid analysis data' },
        { status: 400 }
      )
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: RECOMMENDATION_PROMPT
        },
        {
          role: "user",
          content: `Generate recommendations for these skin concerns: ${JSON.stringify(analysis.metrics)}`
        }
      ],
      temperature: 0.1,
      max_tokens: 2000
    })

    const content = response.choices[0].message.content
    console.log('Raw GPT response in recommendations API:', response.choices[0])
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