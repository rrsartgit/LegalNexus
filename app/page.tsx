"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Shield, CheckCircle, Upload, Star, ArrowRight, Users, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const services = [
    {
      title: "Analiza Nakazu Zapłaty",
      description: "Sprawdzimy czy nakaz zapłaty jest prawidłowy i podpowiemy jak się bronić",
      price: "49 zł",
      icon: FileText,
      popular: true,
    },
    {
      title: "Odpowiedź na Wezwanie Komornika",
      description: "Przygotujemy profesjonalną odpowiedź na działania komornicze",
      price: "79 zł",
      icon: Shield,
      popular: false,
    },
    {
      title: "Skarga na Czynność Komornika",
      description: "Zaskarżymy nieprawidłowe działania komornika sądowego",
      price: "99 zł",
      icon: FileText,
      popular: false,
    },
    {
      title: "Sprzeciw od Nakazu Zapłaty",
      description: "Złożymy sprzeciw w odpowiednim terminie z uzasadnieniem",
      price: "89 zł",
      icon: Clock,
      popular: false,
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Prześlij dokument",
      description: "Wgraj zdjęcie lub skan dokumentu, który otrzymałeś",
    },
    {
      number: "2",
      title: "Opisz sytuację",
      description: "Powiedz nam o swojej sytuacji i oczekiwaniach",
    },
    {
      number: "3",
      title: "Zapłać za analizę",
      description: "Wybierz metodę płatności i opłać analizę dokumentu",
    },
    {
      number: "4",
      title: "Otrzymaj analizę",
      description: "W ciągu 24h otrzymasz profesjonalną analizę prawną",
    },
    {
      number: "5",
      title: "Zamów pisma",
      description: "Na podstawie analizy zamów potrzebne pisma prawne",
    },
  ]

  const stats = [
    { value: "2500+", label: "Przeanalizowanych dokumentów", icon: FileText },
    { value: "1200+", label: "Zadowolonych klientów", icon: Users },
    { value: "24h", label: "Średni czas realizacji", icon: Clock },
    { value: "98%", label: "Skuteczność naszych pism", icon: Award },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">PROFESJONALNA POMOC PRAWNA</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Otrzymałeś pismo prawne?
                  <span className="text-blue-200"> Pomożemy Ci!</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w ciągu 24 godzin. Profesjonalnie, szybko i w
                  przystępnej cenie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/zamow-analize">
                      <Upload className="mr-2 h-5 w-5" />
                      Zamów Analizę
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                    asChild
                  >
                    <Link href="/jak-to-dziala">Zobacz Przykłady</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_38_31.292Z-HPAZjNmjte2mkOf9e0CV34iBxSBSYd.png"
                  alt="Cyfrowe technologie prawne"
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Najczęściej Zamawiane Usługi</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sprawdź nasze najpopularniejsze usługi prawne. Każda analiza zawiera szczegółowe omówienie i konkretne
                wskazówki działania.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={`relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    service.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white font-medium">
                        <Star className="w-3 h-3 mr-1" />
                        Popularne
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
                    <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">{service.description}</p>
                    <Button className="w-full font-medium" variant={service.popular ? "default" : "outline"}>
                      Zamów Teraz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Jak to działa?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Prosty proces w 5 krokach - od przesłania dokumentu do otrzymania gotowych pism prawnych.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-6 -right-4 h-5 w-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Technology Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-blue-100 text-blue-800 mb-4 font-medium">TECHNOLOGIA AI</Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Łączymy tradycyjną wiedzę prawniczą z nowoczesną technologią
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Nasze rozwiązania wykorzystują sztuczną inteligencję do analizy dokumentów prawnych, zachowując przy
                  tym najwyższe standardy profesjonalizmu i dokładności.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Szybka analiza dokumentów</h4>
                      <p className="text-gray-600">AI pomaga w błyskawicznej identyfikacji kluczowych elementów</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Weryfikacja przez prawników</h4>
                      <p className="text-gray-600">Każda analiza jest sprawdzana przez doświadczonych prawników</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Personalizowane rozwiązania</h4>
                      <p className="text-gray-600">Każde pismo dostosowane do konkretnej sytuacji klienta</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_39_14.829Z-7kvRLxYPRuKzmNZMZSDH7EGQ08p7n7.png"
                  alt="AI w prawie"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Dlaczego warto nam zaufać?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Szybka Realizacja</h3>
                <p className="text-gray-600">Analiza dokumentów w ciągu 24 godzin, pisma prawne w 48 godzin</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pełna Poufność</h3>
                <p className="text-gray-600">Zachowujemy tajemnicę zawodową i bezpieczeństwo Twoich danych</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gwarancja Jakości</h3>
                <p className="text-gray-600">Wszystkie dokumenty przygotowywane przez doświadczonych prawników</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Gotowy na Profesjonalną Pomoc?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nie czekaj - każdy dzień zwłoki może mieć znaczenie prawne. Zamów analizę już dziś!
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold" asChild>
              <Link href="/zamow-analize">
                <Upload className="mr-2 h-5 w-5" />
                Zamów Analizę Teraz
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
