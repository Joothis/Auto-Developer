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

    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Check if Google AI Studio API key is configured
    const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "AI service not configured" }, { status: 500 })
    }

    // Enhanced system prompt for backend development assistance
    const systemPrompt = `You are an expert backend development AI assistant. You specialize in:

1. API Development (REST, GraphQL, WebSocket)
2. Database Design & Optimization
3. Authentication & Security
4. Cloud Deployment & DevOps
5. Performance Optimization
6. Code Generation & Best Practices

Provide practical, actionable advice with code examples when appropriate. Focus on modern technologies like:
- Node.js, Python, Go, Java, C#
- Express, FastAPI, Gin, Spring Boot, .NET
- PostgreSQL, MongoDB, Redis
- AWS, Google Cloud, Azure
- Docker, Kubernetes
- JWT, OAuth, API Security

Always consider scalability, security, and maintainability in your responses.

User question: ${message}`

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
                  text: systemPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      },
    )

    if (!response.ok) {
      console.error("Google AI Studio API error:", await response.text())
      return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response at this time."

    return NextResponse.json({
      response: aiResponse,
    })
  } catch (error) {
    console.error("AI chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}