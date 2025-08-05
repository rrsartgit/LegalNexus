"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, TrendingUp, Award, Globe } from "lucide-react"
import Link from "next/link"

export function StatsSection() {
  const achievements = [
    {
      icon: Star,
      value: "4.9/5",
      label: "Ocena Klientów",
      description: "Średnia ocena na podstawie 1,200+ opinii",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Skuteczność",
      description: "Procent wygranych spraw w sądach",
    },
    {
      icon: Award,
      value: "15+",
      label: "Lat Doświadczenia",
      description: "Średnie doświadczenie naszych prawników",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Miast w Polsce",
      description: "Zasięg naszych usług prawnych",
    },
  ]

  const testimonials = [
    {
      name: "Dr Anna Kowalska",
      role: "Kancelaria Prawna Kowalska & Partnerzy",
      content:
        "LegalNexus zrewolucjonizował sposób, w jaki analizujemy dokumenty. Oszczędzamy 70% czasu na wstępnej analizie umów.",
      rating: 5,
    },
    {
      name: "Mgr Piotr Nowak",
      role: "Kancelaria Adwokacka Nowak",
      content:
        "Profesjonalne wsparcie AI i dostęp do ekspertów prawnych 24/7. Nie wyobrażam sobie pracy bez tej platformy.",
      rating: 5,
    },
    {
      name: "Mgr Katarzyna Wiśniewska",
      role: "Kancelaria Radców Prawnych",
      content:
        "Bezpieczeństwo danych na najwyższym poziomie. Mogę spokojnie powierzyć platformie najważniejsze dokumenty klientów.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Nasze Osiągnięcia
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Liczby Mówią Same za Siebie
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Zaufały nam setki kancelarii prawnych z całej Polski. Zobacz, dlaczego jesteśmy liderem w dziedzinie
            technologii prawniczych.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow dark:bg-gray-700">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{achievement.label}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Co Mówią Nasi Klienci
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-gray-700">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Gotowy na Rozpoczęcie Współpracy?</h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Dołącz do grona zadowolonych klientów i odkryj, jak nowoczesne technologie mogą usprawnić pracę Twojej
            kancelarii.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/rejestracja">
                Rozpocznij Bezpłatnie
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/kontakt">Skontaktuj się z Nami</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
