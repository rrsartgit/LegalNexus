"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Users, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  const benefits = [
    "Analiza dokumentów w 5 minut",
    "Zgodność z RODO i tajemnicą zawodową",
    "Wsparcie 24/7 dla kancelarii",
    "Integracja z systemami sądowymi",
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Zap className="w-4 h-4 mr-2" />
                Nowa Era Prawa
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Kancelaria X<span className="text-blue-600 dark:text-blue-400"> – Inteligentne</span>
                <br />
                Usługi Prawne
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Nowoczesna platforma prawnicza z AI dla kancelarii. Analiza dokumentów, konsultacje i reprezentacja –
                wszystko w jednym miejscu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/panel-klienta">
                  Rozpocznij Teraz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/jak-to-dziala">Jak to działa?</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Zgodność z RODO</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">500+ Kancelarii</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-80 w-full">
                  <Image
                    src="/images/digital-gavel.png"
                    alt="Cyfrowy młotek sędziowski"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
