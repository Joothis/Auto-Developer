import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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

// GET /api/notes - Get all notes for authenticated user
export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const notes = await prisma.note.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ notes })
  } catch (error) {
    console.error("Get notes error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/notes - Create a new note
export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()

    // Validate input
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: decoded.userId,
      },
    })

    return NextResponse.json(
      {
        message: "Note created successfully",
        note,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
