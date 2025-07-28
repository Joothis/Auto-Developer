"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Loader2 } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

interface AIInsightsProps {
  notes: Note[]
}

export function AIInsights({ notes }: AIInsightsProps) {
  const [insights, setInsights] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateInsights = async () => {
    if (notes.length === 0) {
      toast({
        title: "No Notes",
        description: "Create some notes first to generate AI insights.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/ai/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes }),
      })

      if (response.ok) {
        const data = await response.json()
        setInsights(data.insights)
        toast({
          title: "Success",
          description: "AI insights generated successfully!",
        })
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to generate insights",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
          AI Insights
        </CardTitle>
        <CardDescription>Get AI-powered insights from your notes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateInsights} disabled={isLoading || notes.length === 0} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Insights
        </Button>

        {insights && (
          <div className="p-4 bg-blue-50 rounded-lg border">
            <h4 className="font-medium text-blue-900 mb-2">AI Analysis:</h4>
            <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-wrap">{insights}</p>
          </div>
        )}

        {notes.length === 0 && (
          <p className="text-sm text-gray-500 text-center">Create some notes to unlock AI insights</p>
        )}
      </CardContent>
    </Card>
  )
}
