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

// PUT /api/notes/[id] - Update a note
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()
    const noteId = params.id

    // Validate input
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Check if note exists and belongs to user
    const existingNote = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: decoded.userId,
      },
    })

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Update note
    const note = await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      message: "Note updated successfully",
      note,
    })
  } catch (error) {
    console.error("Update note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/notes/[id] - Delete a note
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const noteId = params.id

    // Check if note exists and belongs to user
    const existingNote = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: decoded.userId,
      },
    })

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Delete note
    await prisma.note.delete({
      where: { id: noteId },
    })

    return NextResponse.json({
      message: "Note deleted successfully",
    })
  } catch (error) {
    console.error("Delete note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
