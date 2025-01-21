import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a skin analysis expert. Analyze the facial skin image and provide scores from 0-100 for these metrics: hyperpigmentation, melasma, eyebags, redness, texture, wrinkles, skin sagging, dark spots, and freckles. Also provide an overall skin health score. Format as JSON.",
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
    console.log('Analysis response:', analysisContent)
    if (!analysisContent) {
      throw new Error('No analysis content received')
    }

    return NextResponse.json(JSON.parse(analysisContent))
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