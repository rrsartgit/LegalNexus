"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, FileSearch, Scale, Users, Zap, Clock, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

export function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "Asystent AI z RAG",
      description: "Zaawansowany asystent prawny wykorzystujący technologię Retrieval-Augmented Generation",
      benefits: ["Natychmiastowe odpowiedzi", "Analiza kontekstu", "Polskie prawo"],
      image: "/images/ai-justice.png",
      color: "blue",
    },
    {
      icon: FileSearch,
      title: "Analiza Dokumentów",
      description: "Automatyczna analiza umów, pozwów i innych dokumentów prawnych",
      benefits: ["Wykrywanie ryzyka", "Wyodrębnianie klauzul", "Porównywanie wersji"],
      image: "/images/digital-gavel.png",
      color: "green",
    },
    {
      icon: Scale,
      title: "Baza Orzecznictwa",
      description: "Dostęp do aktualnego orzecznictwa i precedensów prawnych",
      benefits: ["Aktualne wyroki", "Analiza trendów", "Wyszukiwanie podobnych spraw"],
      image: "/images/digital-justice.png",
      color: "purple",
    },
    {
      icon: Users,
      title: "Zarządzanie Kancelarią",
      description: "Kompleksowe narzędzia do zarządzania sprawami i klientami",
      benefits: ["CRM prawny", "Kalendarz rozpraw", "Faktury i rozliczenia"],
      image: "/images/legal-tech-symbol.png",
      color: "orange",
    },
  ]

  const stats = [
    { label: "Kancelarii korzysta", value: "500+", icon: Users },
    { label: "Dokumentów przeanalizowano", value: "50k+", icon: FileSearch },
    { label: "Zapytań AI dziennie", value: "10k+", icon: Bot },
    { label: "Średni czas oszczędności", value: "4h", icon: Clock },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Zaawansowane Funkcje
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Wszystko czego potrzebujesz w jednym miejscu
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Kompleksowa platforma prawna łącząca sztuczną inteligencję z praktycznymi narzędziami dla nowoczesnych
            kancelarii prawnych.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="flex">
                <div className="flex-1 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900`}>
                        <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-0">
                    <ul className="space-y-2 mb-4">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <Button variant="ghost" className="group-hover:bg-gray-100 dark:group-hover:bg-gray-800 p-0">
                      Dowiedz się więcej
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </div>

                <div className="w-32 relative">
                  <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Gotowy na rewolucję w swojej kancelarii?</h3>
            <p className="text-blue-100 mb-6">Dołącz do setek kancelarii, które już korzystają z naszej platformy AI</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Rozpocznij bezpłatny okres próbny
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Umów prezentację
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
