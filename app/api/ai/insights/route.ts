import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Helper function to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key") as { userId: string }
  } catch (error) {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { notes } = await request.json()

    if (!notes || notes.length === 0) {
      return NextResponse.json({ error: "No notes provided" }, { status: 400 })
    }

    // Check if Google AI Studio API key is configured
    const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Google AI Studio API key not configured" }, { status: 500 })
    }

    // Prepare notes content for AI analysis
    const notesContent = notes.map((note: any) => `Title: ${note.title}\nContent: ${note.content}`).join("\n\n---\n\n")

    const prompt = `Analyze the following notes and provide insights about patterns, themes, and suggestions for the user. Be concise and helpful:

${notesContent}

Please provide:
1. Main themes or topics
2. Patterns you notice
3. Suggestions for organization or next steps
4. Any interesting observations

Keep the response under 200 words and make it actionable.`

    // Call Google AI Studio API (Gemini)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      console.error("Google AI Studio API error:", await response.text())
      return NextResponse.json({ error: "Failed to generate AI insights" }, { status: 500 })
    }

    const data = await response.json()
    const insights = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate insights at this time."

    return NextResponse.json({
      insights,
    })
  } catch (error) {
    console.error("AI insights error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
