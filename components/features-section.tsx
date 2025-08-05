"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Scale, Shield, Clock, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Analiza Dokumentów AI",
      description:
        "Automatyczna analiza umów, pozwów i innych dokumentów prawnych z wyodrębnieniem kluczowych informacji.",
      benefits: ["Analiza w 5 minut", "Wykrywanie ryzyk", "Podsumowanie kluczowych punktów"],
      href: "/analiza-dokumentow",
    },
    {
      icon: MessageSquare,
      title: "Konsultacje Prawne",
      description: "Profesjonalne konsultacje z doświadczonymi prawnikami z Gdańska dostępne online 24/7.",
      benefits: ["Dostęp 24/7", "Certyfikowani prawnicy", "Konkurencyjne ceny"],
      href: "/konsultacje",
    },
    {
      icon: Scale,
      title: "Reprezentacja Sądowa",
      description: "Pełna reprezentacja prawna w sądach powszechnych i administracyjnych na terenie całej Polski.",
      benefits: ["Doświadczeni adwokaci", "Pełna reprezentacja", "Transparentne koszty"],
      href: "/reprezentacja",
    },
    {
      icon: Shield,
      title: "Bezpieczeństwo Danych",
      description: "Najwyższe standardy bezpieczeństwa zgodne z RODO i wymogami tajemnicy zawodowej.",
      benefits: ["Szyfrowanie end-to-end", "Zgodność z RODO", "Audyty bezpieczeństwa"],
      href: "/bezpieczenstwo",
    },
  ]

  const stats = [
    { number: "500+", label: "Obsłużonych Kancelarii", icon: Users },
    { number: "10,000+", label: "Przeanalizowanych Dokumentów", icon: FileText },
    { number: "24/7", label: "Dostępność Wsparcia", icon: Clock },
    { number: "99.9%", label: "Uptime Platformy", icon: Shield },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Nasze Usługi
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kompleksowe Rozwiązania Prawne
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Oferujemy pełen zakres usług prawnych wspieranych najnowszymi technologiami AI, dostosowanych do potrzeb
            nowoczesnych kancelarii.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-gray-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors bg-transparent"
                  asChild
                >
                  <Link href={feature.href}>
                    Dowiedz się więcej
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Zaufały Nam Setki Kancelarii</h3>
            <p className="text-blue-100 text-lg">Sprawdź nasze osiągnięcia i dołącz do grona zadowolonych klientów</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
