"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Users,
  Award,
  Calendar,
  Scale,
  Building,
  Heart,
  Target,
  Shield,
  Phone,
  Mail,
  FileText,
  Lightbulb,
  CheckCircle,
  Clock,
  Send,
  MessageSquare,
  Gavel,
  HelpCircle,
  Star,
  ArrowRight,
} from "lucide-react"

type Section =
  | "home"
  | "jak-to-dziala"
  | "funkcje"
  | "o-nas"
  | "kontakt"
  | "analiza-dokumentow"
  | "pisma-prawne"
  | "konsultacje"
  | "reprezentacja"
  | "regulamin"
  | "polityka-prywatnosci"
  | "rodo"
  | "faq"
  | "asystent-ai"
  | "blog"
  | "poradniki"
  | "zamow-analize"

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="bg-blue-800 text-blue-100 hover:bg-blue-700">
              NOWA GENERACJA
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Profesjonalny System API dla Kancelarii Prawnych
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              Zaawansowane rozwiązanie API z architekturą Domain-Driven Design, RESTful oraz profesjonalnymi SDK dla
              wszystkich popularnych języków programowania.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Poznaj API
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Obejrzyj Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-auto text-sm text-white/80">API Console</div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`GET /api/v1/law-firms/123
Accept: application/vnd.api+json
Authorization: Bearer YOUR_API_KEY`}</code>
                  </pre>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-blue-300 text-sm">
                    <code>{`{
  "data": {
    "type": "law-firms",
    "id": "123",
    "attributes": {
      "name": "Kowalski i Wspólnicy",
      "specializations": ["prawo spółek", "podatki"],
      "lawyers_count": 12
    }
  }
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      title: "Architektura Domain-Driven",
      description:
        "Architektura oparta o domenę biznesową z agregatami, encjami i obiektami wartości dla precyzyjnego modelowania danych prawnych.",
      icon: Building,
    },
    {
      title: "Wyszukiwanie Pełnotekstowe",
      description:
        "Potężna integracja z Elasticsearch z filtrowaniem, paginacją i zaawansowanymi możliwościami zapytań.",
      icon: FileText,
    },
    {
      title: "Bezpieczeństwo Klasy Enterprise",
      description: "OAuth 2.0, tokeny JWT, szyfrowanie danych i kompleksowy audyt bezpieczeństwa.",
      icon: Shield,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Zaawansowane Funkcje</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            System stworzony z myślą o profesjonalnych kancelariach prawnych, oferujący funkcjonalność i niezawodność
            klasy enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section Component
function StatsSection() {
  const stats = [
    { value: "200+", label: "Kancelarii korzysta", icon: Building },
    { value: "1500+", label: "Prawników korzysta", icon: Users },
    { value: "99.9%", label: "Dostępność API", icon: CheckCircle },
    { value: "24/7", label: "Wsparcie Techniczne", icon: Clock },
  ]

  return (
    <section className="py-20 bg-gray-50">
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
  )
}

// AI Assistant Component
function AIAssistant() {
  const [message, setMessage] = useState("")

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Asystent AI LexiCore RAG</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pierwsze w Polsce wdrożenie technologii RAG (Retrieval-Augmented Generation) dedykowane dla kancelarii
            prawnych.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Zadaj pytanie prawne..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button>Wyślij</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Home Section Component
function HomeSection() {
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

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />

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

      <AIAssistant />
    </>
  )
}

// Jak to działa Section
function JakToDzialaSection() {
  const steps = [
    {
      number: "01",
      title: "Prześlij dokumenty",
      description:
        "Załaduj swoje dokumenty prawne w bezpiecznym środowisku online. Obsługujemy pliki PDF, DOC, JPG i inne popularne formaty.",
      icon: FileText,
    },
    {
      number: "02",
      title: "Analiza AI",
      description:
        "Nasz zaawansowany system AI analizuje dokumenty pod kątem prawnym, identyfikując kluczowe elementy i potencjalne problemy.",
      icon: Lightbulb,
    },
    {
      number: "03",
      title: "Otrzymaj analizę",
      description:
        "W ciągu 24 godzin otrzymasz szczegółową analizę prawną z rekomendacjami i sugestiami dalszych działań.",
      icon: CheckCircle,
    },
    {
      number: "04",
      title: "Zamów pisma",
      description:
        "Na podstawie analizy możesz zamówić profesjonalne pisma prawne przygotowane przez doświadczonych prawników.",
      icon: FileText,
    },
  ]

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            JAK TO DZIAŁA
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Prosta ścieżka do profesjonalnej pomocy prawnej</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            W zaledwie kilku krokach otrzymasz profesjonalną analizę prawną i niezbędne dokumenty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-blue-50">{step.number}</div>
                <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Rozpocznij analizę dokumentów
          </Button>
        </div>
      </div>
    </div>
  )
}

// Funkcje Section
function FunkcjeSection() {
  const features = [
    {
      icon: FileText,
      title: "Analiza dokumentów prawnych",
      description:
        "Zaawansowana analiza AI dokumentów prawnych z identyfikacją kluczowych elementów i potencjalnych problemów.",
      benefits: ["Szybka analiza w 24h", "Identyfikacja ryzyk prawnych", "Rekomendacje działań", "Zgodność z RODO"],
    },
    {
      icon: Scale,
      title: "Generowanie pism prawnych",
      description: "Automatyczne tworzenie profesjonalnych pism prawnych na podstawie analizy dokumentów.",
      benefits: ["Szablony prawne", "Personalizacja treści", "Zgodność z przepisami", "Szybka realizacja"],
    },
    {
      icon: MessageSquare,
      title: "Konsultacje online",
      description: "Bezpośredni kontakt z doświadczonymi prawnikami przez platformę online.",
      benefits: ["Dostępność 24/7", "Specjaliści różnych dziedzin", "Bezpieczna komunikacja", "Konkurencyjne ceny"],
    },
    {
      icon: Shield,
      title: "Bezpieczeństwo danych",
      description: "Najwyższe standardy bezpieczeństwa i ochrony danych osobowych zgodnie z RODO.",
      benefits: ["Szyfrowanie end-to-end", "Zgodność z RODO", "Backup danych", "Kontrola dostępu"],
    },
  ]

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            FUNKCJE PLATFORMY
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Kompleksowe rozwiązania prawne online</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nasza platforma oferuje pełen zakres usług prawnych dostępnych online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// O nas Section
function ONasSection() {
  const teamMembers = [
    {
      name: "Dr hab. Marek Kowalski",
      position: "Założyciel i Dyrektor Generalny",
      specialization: "Prawo cywilne, prawo handlowe",
      experience: "25 lat praktyki prawniczej",
      education: "Uniwersytet Gdański, Wydział Prawa i Administracji",
    },
    {
      name: "Mgr Anna Nowak",
      position: "Dyrektor Techniczny",
      specialization: "Systemy informatyczne dla prawników",
      experience: "15 lat w branży IT",
      education: "Politechnika Gdańska, Informatyka",
    },
    {
      name: "Mgr Piotr Wiśniewski",
      position: "Główny Prawnik Produktu",
      specialization: "Prawo procesowe, informatyzacja wymiaru sprawiedliwości",
      experience: "12 lat w kancelariach prawnych",
      education: "Uniwersytet Gdański, aplikacja adwokacka",
    },
  ]

  const values = [
    {
      icon: Scale,
      title: "Etyka i Profesjonalizm",
      description:
        "Przestrzegamy najwyższych standardów etycznych zawodu prawniczego i dbamy o zachowanie tajemnicy zawodowej.",
    },
    {
      icon: Shield,
      title: "Bezpieczeństwo Danych",
      description:
        "Bezpieczeństwo informacji klientów jest naszym priorytetem. Stosujemy najnowsze technologie ochrony danych.",
    },
    {
      icon: Target,
      title: "Innowacyjność",
      description: "Łączymy tradycyjną praktykę prawną z nowoczesnymi technologiami, tworząc rozwiązania przyszłości.",
    },
    {
      icon: Heart,
      title: "Wsparcie Klientów",
      description: "Każdy klient otrzymuje pełne wsparcie techniczne i merytoryczne od naszego doświadczonego zespołu.",
    },
  ]

  const milestones = [
    {
      year: "2018",
      title: "Założenie Firmy",
      description: "Rozpoczęcie prac nad pierwszym systemem zarządzania kancelariami prawymi w Gdańsku",
    },
    {
      year: "2019",
      title: "Pierwsi Klienci",
      description: "Wdrożenie systemu w 5 kancelariach prawnych w Trójmieście",
    },
    {
      year: "2021",
      title: "Ekspansja Regionalna",
      description: "Rozszerzenie działalności na całe województwo pomorskie - 50+ kancelarii",
    },
    {
      year: "2023",
      title: "Wprowadzenie AI",
      description: "Uruchomienie LexiCore - pierwszego asystenta AI dla prawników w Polsce",
    },
    {
      year: "2024",
      title: "Obecność Ogólnopolska",
      description: "Ponad 200 kancelarii prawnych w całej Polsce korzysta z naszych rozwiązań",
    },
  ]

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            <Building className="w-4 h-4 mr-2" />
            NASZA HISTORIA
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Legal API Nexus - Lider Technologii Prawniczych</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Od 2018 roku tworzymy innowacyjne rozwiązania informatyczne dla kancelarii prawnych, łącząc głęboką wiedzę
            prawniczą z najnowszymi technologiami.
          </p>
        </div>

        {/* Misja i Wizja */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Misja i Wizja Firmy</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">Nasza Misja</h3>
                <p className="text-gray-700 leading-relaxed">
                  Wspieramy kancelarie prawne w całej Polsce poprzez dostarczanie nowoczesnych, bezpiecznych i
                  intuicyjnych narzędzi informatycznych, które zwiększają efektywność pracy prawników i poprawiają
                  jakość obsługi klientów.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">Nasza Wizja</h3>
                <p className="text-gray-700 leading-relaxed">
                  Chcemy być wiodącym dostawcą technologii prawniczych w Polsce, tworząc rozwiązania, które
                  przekształcają tradycyjną praktykę prawną w nowoczesną, efektywną i dostępną usługę dla wszystkich
                  obywateli.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-gray-600">Kancelarii Klientów</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">16</div>
                <div className="text-gray-600">Województw</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-gray-600">Lat Doświadczenia</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-gray-600">Wsparcie Techniczne</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nasze Wartości</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fundamenty, na których budujemy nasze rozwiązania i relacje z klientami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Historia Rozwoju */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Historia Rozwoju</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kluczowe momenty w rozwoju naszej firmy i produktów.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zespół Kierowniczy */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Zespół Kierowniczy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Doświadczeni profesjonaliści łączący wiedzę prawniczą z ekspertyzą technologiczną.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-blue-600 font-medium">{member.position}</p>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-gray-600 text-sm">{member.specialization}</p>
                  <p className="text-gray-500 text-sm">{member.experience}</p>
                  <p className="text-gray-500 text-sm">{member.education}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nasze Biuro w Gdańsku */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nasze Biuro w Gdańsku</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <p className="font-semibold">Legal API Nexus Sp. z o.o.</p>
                  <p className="text-gray-600">ul. Długa 47/48</p>
                  <p className="text-gray-600">80-831 Gdańsk</p>
                </div>
              </div>
              <div className="flex items-center">
                <Building className="h-6 w-6 text-blue-600 mr-3" />
                <p className="text-gray-600">Centrum Gdańska, blisko Sądu Okręgowego</p>
              </div>
            </div>

            <div className="mt-8">
              <Button size="lg">Umów Spotkanie w Biurze</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Dlaczego Gdańsk?</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  Gdańsk to dynamicznie rozwijające się centrum prawnicze północnej Polski, gdzie tradycja prawnicza
                  spotyka się z nowoczesnymi technologiami.
                </p>
                <p>
                  Nasze biuro znajduje się w sercu miasta, w pobliżu najważniejszych instytucji prawnych, co pozwala nam
                  na bliską współpracę z lokalnymi kancelariami i lepsze zrozumienie ich potrzeb.
                </p>
                <p>
                  Gdańsk jest również ważnym ośrodkiem technologicznym, co umożliwia nam dostęp do najlepszych talentów
                  IT i najnowszych rozwiązań technicznych.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Kontakt Section
function KontaktSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Dziękujemy za wiadomość! Skontaktujemy się z Państwem w ciągu 24 godzin.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            KONTAKT
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Skontaktuj się z nami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Masz pytania? Potrzebujesz pomocy? Nasz zespół jest gotowy, aby Ci pomóc.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Wyślij wiadomość</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Imię i nazwisko *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Temat</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Wiadomość *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Wyślij wiadomość
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Telefon</h3>
                </div>
                <p className="text-gray-600 mb-2">Zadzwoń do nas w godzinach pracy</p>
                <p className="text-xl font-semibold text-blue-600">+48 58 123 45 67</p>
                <p className="text-sm text-gray-500 mt-2">Pon-Pt: 8:00-18:00, Sob: 9:00-14:00</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Email</h3>
                </div>
                <p className="text-gray-600 mb-2">Napisz do nas - odpowiemy w ciągu 24h</p>
                <p className="text-xl font-semibold text-blue-600">kontakt@legalnexus.pl</p>
                <p className="text-sm text-gray-500 mt-2">Dla pilnych spraw: pilne@legalnexus.pl</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Adres</h3>
                </div>
                <p className="text-gray-600 mb-2">Odwiedź nas w naszym biurze</p>
                <address className="not-italic">
                  <p className="font-semibold">Legal Nexus Sp. z o.o.</p>
                  <p>ul. Długa 46/47</p>
                  <p>80-831 Gdańsk</p>
                </address>
                <p className="text-sm text-gray-500 mt-2">Centrum miasta, 5 min od Dworca Głównego</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Godziny pracy</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Poniedziałek - Piątek:</span>
                    <span className="font-semibold">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sobota:</span>
                    <span className="font-semibold">9:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Niedziela:</span>
                    <span className="font-semibold">Zamknięte</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Service Sections
function AnalizaDokumentowSection() {
  const features = [
    {
      icon: FileText,
      title: "Szybka analiza",
      description: "Analiza dokumentów w ciągu 24 godzin",
    },
    {
      icon: Shield,
      title: "Bezpieczeństwo",
      description: "Pełna ochrona danych zgodnie z RODO",
    },
    {
      icon: CheckCircle,
      title: "Dokładność",
      description: "Precyzyjna identyfikacja problemów prawnych",
    },
  ]

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            ANALIZA DOKUMENTÓW
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Profesjonalna analiza dokumentów prawnych</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Otrzymaj szczegółową analizę swoich dokumentów prawnych od doświadczonych prawników
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Rozpocznij analizę dokumentów
          </Button>
        </div>
      </div>
    </div>
  )
}

function PismaPrawneSection() {
  const documentTypes = [
    {
      icon: FileText,
      title: "Pozwy i wnioski",
      description: "Profesjonalne przygotowanie pozwów sądowych i wniosków procesowych",
    },
    {
      icon: Scale,
      title: "Umowy",
      description: "Sporządzanie umów cywilnoprawnych i handlowych",
    },
    {
      icon: Gavel,
      title: "Odwołania",
      description: "Przygotowanie odwołań i zażaleń w sprawach administracyjnych",
    },
  ]

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            PISMA PRAWNE
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Profesjonalne pisma prawne</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zlecaj przygotowanie pism prawnych doświadczonym prawnikom
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {documentTypes.map((type, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <type.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Zamów pismo prawne
          </Button>
        </div>
      </div>
    </div>
  )
}

function KonsultacjeSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            KONSULTACJE
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Konsultacje prawne online</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Skonsultuj swoją sprawę z doświadczonym prawnikiem</p>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Umów konsultację
          </Button>
        </div>
      </div>
    </div>
  )
}

function ReprezentacjaSection() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            REPREZENTACJA
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Reprezentacja prawna</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profesjonalna reprezentacja w sprawach sądowych i administracyjnych
          </p>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Zapytaj o reprezentację
          </Button>
        </div>
      </div>
    </div>
  )
}

// Legal Sections
function RegulaminSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            REGULAMIN
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Regulamin świadczenia usług</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>§ 1 Postanowienia ogólne</h2>
          <p>
            Niniejszy Regulamin określa zasady świadczenia usług prawnych przez Legal Nexus Sp. z o.o. z siedzibą w
            Gdańsku.
          </p>

          <h2>§ 2 Definicje</h2>
          <p>Użyte w Regulaminie pojęcia oznaczają:</p>
          <ul>
            <li>
              <strong>Usługodawca</strong> - Legal Nexus Sp. z o.o.
            </li>
            <li>
              <strong>Klient</strong> - osoba fizyczna lub prawna korzystająca z usług
            </li>
            <li>
              <strong>Platforma</strong> - system informatyczny dostępny pod adresem legalnexus.pl
            </li>
          </ul>

          <h2>§ 3 Zakres usług</h2>
          <p>Usługodawca świadczy następujące usługi:</p>
          <ul>
            <li>Analiza dokumentów prawnych</li>
            <li>Przygotowanie pism prawnych</li>
            <li>Konsultacje prawne online</li>
            <li>Reprezentacja prawna</li>
          </ul>

          <h2>§ 4 Warunki świadczenia usług</h2>
          <p>Usługi świadczone są po uprzednim zawarciu umowy i uiszczeniu należnej opłaty.</p>

          <h2>§ 5 Odpowiedzialność</h2>
          <p>Usługodawca ponosi odpowiedzialność za świadczone usługi zgodnie z obowiązującymi przepisami prawa.</p>

          <h2>§ 6 Postanowienia końcowe</h2>
          <p>Regulamin wchodzi w życie z dniem publikacji na stronie internetowej.</p>
        </div>
      </div>
    </div>
  )
}

function PolitykaPrywatnosciSection() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            POLITYKA PRYWATNOŚCI
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Polityka prywatności</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Informacje ogólne</h2>
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych przez Legal Nexus Sp. z o.o.
          </p>

          <h2>2. Administrator danych</h2>
          <p>
            Administratorem danych osobowych jest Legal Nexus Sp. z o.o. z siedzibą w Gdańsku, ul. Długa 46/47, 80-831
            Gdańsk.
          </p>

          <h2>3. Zakres przetwarzanych danych</h2>
          <p>Przetwarzamy następujące kategorie danych osobowych:</p>
          <ul>
            <li>Dane identyfikacyjne (imię, nazwisko)</li>
            <li>Dane kontaktowe (email, telefon, adres)</li>
            <li>Dane dotyczące świadczonych usług</li>
          </ul>

          <h2>4. Cele przetwarzania</h2>
          <p>Dane osobowe przetwarzane są w celu:</p>
          <ul>
            <li>Świadczenia usług prawnych</li>
            <li>Kontaktu z klientem</li>
            <li>Wystawiania faktur</li>
            <li>Wypełniania obowiązków prawnych</li>
          </ul>

          <h2>5. Podstawy prawne</h2>
          <p>Przetwarzanie danych odbywa się na podstawie:</p>
          <ul>
            <li>Zgody osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO)</li>
            <li>Wykonania umowy (art. 6 ust. 1 lit. b RODO)</li>
            <li>Wypełnienia obowiązku prawnego (art. 6 ust. 1 lit. c RODO)</li>
          </ul>

          <h2>6. Prawa osób, których dane dotyczą</h2>
          <p>Przysługują Państwu następujące prawa:</p>
          <ul>
            <li>Prawo dostępu do danych</li>
            <li>Prawo do sprostowania danych</li>
            <li>Prawo do usunięcia danych</li>
            <li>Prawo do ograniczenia przetwarzania</li>
            <li>Prawo do przenoszenia danych</li>
            <li>Prawo sprzeciwu</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function RODOSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            RODO
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Informacje RODO</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Ochrona danych osobowych</h2>
          <p>
            Legal Nexus Sp. z o.o. przestrzega przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z
            dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w
            sprawie swobodnego przepływu takich danych (RODO).
          </p>

          <h2>Bezpieczeństwo danych</h2>
          <p>
            Stosujemy odpowiednie środki techniczne i organizacyjne w celu zapewnienia bezpieczeństwa przetwarzanych
            danych osobowych.
          </p>

          <h2>Kontakt w sprawach RODO</h2>
          <p>W sprawach dotyczących ochrony danych osobowych można kontaktować się pod adresem: rodo@legalnexus.pl</p>
        </div>
      </div>
    </div>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: "Jak długo trwa analiza dokumentów?",
      answer:
        "Standardowa analiza dokumentów trwa do 24 godzin roboczych od momentu przesłania wszystkich wymaganych materiałów.",
    },
    {
      question: "Czy moje dane są bezpieczne?",
      answer:
        "Tak, stosujemy najwyższe standardy bezpieczeństwa i szyfrowania danych. Wszystkie informacje są chronione zgodnie z RODO.",
    },
    {
      question: "Jakie dokumenty mogę przesłać do analizy?",
      answer:
        "Przyjmujemy dokumenty w formatach PDF, DOC, DOCX, JPG, PNG. Maksymalny rozmiar poje "Przyjmujemy dokumenty w formatach PDF, DOC, DOCX, JPG, PNG. Maksymalny rozmiar pojedynczego pliku to 10MB.",
    },
    {
      question: "Czy mogę anulować zamówienie?",
      answer:
        "Tak, możesz anulować zamówienie do momentu rozpoczęcia prac przez prawnika. Po rozpoczęciu prac anulowanie nie jest możliwe.",
    },
    {
      question: "Jak mogę skontaktować się z prawnikiem?",
      answer: \"Kontakt z prawnikiem odbywa się przez bezpieczną platformę wiadomości dostępną w panelu klienta.",
    },
  ]
  \
  return (
    <div className="py-20 bg-gray-50">
      \
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            FAQ
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Często zadawane pytania</h1>\
          <p className="text-xl text-gray-600">
            \ Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
          <Button size="lg">Skontaktuj się z nami</Button>
        </div>
      </div>
    </div>
  )
}

// Additional sections (simplified for brevity)
function AsystentAISection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIAssistant />
      </div>
    </div>
  )
}

function BlogSection() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Blog prawniczy</h1>
          <p className="text-xl text-gray-600">Aktualności i porady prawne</p>
        </div>
      </div>
    </div>
  )
}

function PoradnikiSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Poradniki prawne</h1>
          <p className="text-xl text-gray-600">Praktyczne poradniki krok po kroku</p>
        </div>
      </div>
    </div>
  )
}

function ZamowAnalizeSection() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Zamów analizę dokumentów</h1>
          <p className="text-xl text-gray-600">Rozpocznij proces analizy swoich dokumentów</p>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("home")

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />
      case "jak-to-dziala":
        return <JakToDzialaSection />
      case "funkcje":
        return <FunkcjeSection />
      case "o-nas":
        return <ONasSection />
      case "kontakt":
        return <KontaktSection />
      case "analiza-dokumentow":
        return <AnalizaDokumentowSection />
      case "pisma-prawne":
        return <PismaPrawneSection />
      case "konsultacje":
        return <KonsultacjeSection />
      case "reprezentacja":
        return <ReprezentacjaSection />
      case "regulamin":
        return <RegulaminSection />
      case "polityka-prywatnosci":
        return <PolitykaPrywatnosciSection />
      case "rodo":
        return <RODOSection />
      case "faq":
        return <FAQSection />
      case "asystent-ai":
        return <AsystentAISection />
      case "blog":
        return <BlogSection />
      case "poradniki":
        return <PoradnikiSection />
      case "zamow-analize":
        return <ZamowAnalizeSection />
      default:
        return <HomeSection />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onSectionChange={setActiveSection} activeSection={activeSection} />
      <main className="flex-1">{renderSection()}</main>
      <Footer />
    </div>
  )
}
