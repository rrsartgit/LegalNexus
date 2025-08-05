"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const benefits = [
    "Analiza dokumentów w 5 minut",
    "Zgodność z RODO i tajemnicą zawodową",
    "Wsparcie 24/7 dla kancelarii",
    "Integracja z systemami sądowymi",
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Zap className="w-4 h-4 mr-2" />
                Nowa Era Prawa
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Profesjonalna
                <span className="text-blue-600 dark:text-blue-400"> Pomoc Prawna</span>
                <br />
                Online
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Nowoczesna platforma prawnicza z AI dla kancelarii w Gdańsku. Analiza dokumentów, konsultacje prawne i
                reprezentacja - wszystko w jednym miejscu.
              </p>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
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

            {/* Trust Indicators */}
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

          {/* Right Column - Visual */}
          <div className="relative">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Zacznij w 3 krokach</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Prosty proces rejestracji i natychmiastowy dostęp
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Zarejestruj się", desc: "Bezpłatne konto w 30 sekund" },
                      { step: "2", title: "Prześlij dokument", desc: "Przeciągnij i upuść plik PDF" },
                      { step: "3", title: "Otrzymaj analizę", desc: "Profesjonalna ocena w 5 minut" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg" asChild>
                    <Link href="/rejestracja">Utwórz Darmowe Konto</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
