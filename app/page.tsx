"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, Database, Cloud, Bot, Rocket, Shield, GitBranch } from "lucide-react"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/auth/login")
    }
  }

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-blue-500" />,
      title: "AI Code Generation",
      description: "Generate backend APIs, database schemas, and business logic using advanced AI models"
    },
    {
      icon: <Code className="h-8 w-8 text-green-500" />,
      title: "Multi-Framework Support",
      description: "Support for Node.js, Python, Go, and more with intelligent framework selection"
    },
    {
      icon: <Database className="h-8 w-8 text-purple-500" />,
      title: "Smart Database Design",
      description: "AI-powered database schema generation and optimization recommendations"
    },
    {
      icon: <Cloud className="h-8 w-8 text-orange-500" />,
      title: "Cloud Deployment",
      description: "One-click deployment to AWS, Google Cloud, Azure, and other platforms"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Security First",
      description: "Built-in security scanning, authentication, and best practices enforcement"
    },
    {
      icon: <GitBranch className="h-8 w-8 text-indigo-500" />,
      title: "Version Control",
      description: "Integrated Git workflow with automated testing and CI/CD pipelines"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Rocket className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">DevAI Studio</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Build Backend Applications
            <span className="text-blue-600"> with AI</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The most advanced AI-powered platform for backend development. Generate APIs, design databases, 
            and deploy applications with intelligent assistance every step of the way.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button onClick={handleGetStarted} size="lg" className="w-full sm:w-auto">
              Start Building Now
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to build backends</h2>
            <p className="mt-4 text-lg text-gray-600">Powerful features designed for modern development workflows</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">APIs Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Projects Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Ready to revolutionize your backend development?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of developers who are building faster with AI assistance.
            </p>
            <Button 
              onClick={handleGetStarted} 
              size="lg" 
              variant="secondary"
              className="mt-6"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}