"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Scale, Bot, FileText, Users, Zap, Shield } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Zap className="w-4 h-4 mr-2" />
                Powered by AI
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Przyszłość
                <span className="text-blue-600 dark:text-blue-400"> Prawa</span>
                <br />w Twoich Rękach
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Nowoczesna platforma prawna z asystentem AI, analizą dokumentów i kompleksowym wsparciem dla kancelarii
                prawnych. Zwiększ efektywność swojej pracy o 300%.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Rozpocznij za darmo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Zobacz demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600 dark:text-gray-300">RODO Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600 dark:text-gray-300">500+ Kancelarii</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Polskie Prawo</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main AI Image */}
              <Card className="col-span-2 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64">
                    <Image src="/images/ai-justice.png" alt="AI Justice" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold">Asystent AI Prawny</h3>
                      <p className="text-sm opacity-90">Natychmiastowe odpowiedzi prawne</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Cards */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative h-32 mb-3">
                    <Image
                      src="/images/digital-justice.png"
                      alt="Digital Justice"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <h4 className="font-semibold text-sm">Analiza RAG</h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Zaawansowana analiza dokumentów z wykorzystaniem AI
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative h-32 mb-3">
                    <Image src="/images/brain-ai.png" alt="AI Brain" fill className="object-cover rounded" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <h4 className="font-semibold text-sm">Baza Wiedzy</h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Dostęp do aktualnych przepisów i orzecznictwa
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>

            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
