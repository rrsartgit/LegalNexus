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
  HelpCircle,
  Star,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/lib/auth"

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
  | "logowanie"
  | "rejestracja"

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
            >
              NOWA GENERACJA
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">PROFESJONALNA POMOC PRAWNA</h1>

            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Otrzymałeś pismo prawne? Pomożemy Ci! Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w ciągu 24
              godzin. Profesjonalnie, szybko i w przystępnej cenie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Zamów Analizę
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Zobacz Przykłady
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_38_31.292Z-wWmNPX5saxsHnqiYyXqNIL5qJsjvaB.png"
                alt="Młotek sędziowski z cyfrowymi elementami technologicznymi"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
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
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Services Section Component
function ServicesSection() {
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

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Najczęściej Zamawiane Usługi</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sprawdź nasze najpopularniejsze usługi prawne. Każda analiza zawiera szczegółowe omówienie i konkretne
            wskazówki działania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                service.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground font-medium">
                    <Star className="w-3 h-3 mr-1" />
                    Popularne
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
                <div className="text-2xl font-bold text-primary">{service.price}</div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground text-center mb-4">{service.description}</p>
                <Button className="w-full font-medium" variant={service.popular ? "default" : "outline"}>
                  Zamów Teraz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// How it works Section
function HowItWorksSection() {
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
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Jak to działa?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prosty proces w 5 krokach - od przesłania dokumentu do otrzymania gotowych pism prawnych.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-6 -right-4 h-5 w-5 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Home Section Component
function HomeSection() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <HowItWorksSection />
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
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            JAK TO DZIAŁA
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Prosta ścieżka do profesjonalnej pomocy prawnej</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            W zaledwie kilku krokach otrzymasz profesjonalną analizę prawną i niezbędne dokumenty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20">{step.number}</div>
                <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-16">
          <div className="relative w-full h-96 lg:h-[500px] max-w-4xl mx-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_27_21.591Z-GrA4CdwK6pQ5l3hpJ7Pzp5t0tOSrVG.png"
              alt="Waga sprawiedliwości z cyfrowym domem reprezentującym technologie prawne"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
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
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            FUNKCJE PLATFORMY
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Kompleksowe rozwiązania prawne online</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nasza platforma oferuje pełen zakres usług prawnych dostępnych online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="relative w-full h-96 lg:h-[500px] max-w-4xl mx-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_39_14.829Z-tdgKajNJil4CXyy0KS1MF3m3qVFGwY.png"
              alt="Dwa mózgi reprezentujące połączenie wiedzy prawnej z technologią AI"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Blog Section
function BlogSection() {
  const blogPosts = [
    {
      title: "Nowelizacja Kodeksu Cywilnego 2024: Co musisz wiedzieć?",
      date: "15 lipca 2024",
      author: "Anna Kowalska",
      summary: "Przegląd najważniejszych zmian w Kodeksie Cywilnym, które weszły w życie w 2024 roku.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_37_56.679Z-YsbpumpjZyymgynsm6tqeoThyIOmJr.png",
    },
    {
      title: "RODO w praktyce: Jak chronić dane osobowe w małej firmie?",
      date: "10 lipca 2024",
      author: "Piotr Nowak",
      summary: "Praktyczne wskazówki dotyczące wdrożenia zasad RODO w codziennej działalności gospodarczej.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_37_56.679Z-YsbpumpjZyymgynsm6tqeoThyIOmJr.png",
    },
    {
      title: "Spory sądowe: Mediacja jako alternatywa dla procesu",
      date: "5 lipca 2024",
      author: "Marta Wiśniewska",
      summary: "Zalety i wady mediacji w rozwiązywaniu konfliktów prawnych. Kiedy warto ją wybrać?",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_37_56.679Z-YsbpumpjZyymgynsm6tqeoThyIOmJr.png",
    },
  ]

  return (
    <div className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            BLOG
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Blog prawniczy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aktualności, analizy i porady prawne od ekspertów LegalNexus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {post.date} by {post.author}
                </p>
                <p className="text-muted-foreground mb-4">{post.summary}</p>
                <Button variant="link" className="p-0 h-auto text-primary hover:underline">
                  Czytaj więcej <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Poradniki Section
function PoradnikiSection() {
  const guides = [
    {
      title: "Jak napisać skuteczne odwołanie od decyzji administracyjnej?",
      description: "Krok po kroku przez proces tworzenia i składania odwołania.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_26_11.229Z-i9mxOGfIoAyj2PyNwuCRmWEaXOb7xb.png",
    },
    {
      title: "Prawa konsumenta: Co zrobić, gdy produkt jest wadliwy?",
      description: "Przewodnik po prawach konsumenta i procedurach reklamacyjnych.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_26_11.229Z-i9mxOGfIoAyj2PyNwuCRmWEaXOb7xb.png",
    },
    {
      title: "Umowa najmu mieszkania: Na co zwrócić uwagę?",
      description: "Kluczowe elementy umowy najmu, które zapewnią bezpieczeństwo obu stronom.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_26_11.229Z-i9mxOGfIoAyj2PyNwuCRmWEaXOb7xb.png",
    },
    {
      title: "Spadek i dziedziczenie: Podstawowe informacje",
      description: "Zrozumienie zasad dziedziczenia ustawowego i testamentowego.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_26_11.229Z-i9mxOGfIoAyj2PyNwuCRmWEaXOb7xb.png",
    },
  ]

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            PORADNIKI
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Poradniki prawne</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Praktyczne poradniki krok po kroku, które pomogą Ci zrozumieć prawo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                <p className="text-muted-foreground mb-4">{guide.description}</p>
                <Button variant="link" className="p-0 h-auto text-primary hover:underline">
                  Czytaj poradnik <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
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

  return (
    <div className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            O NAS
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Nasze Wartości</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fundamenty, na których budujemy nasze rozwiązania i relacje z klientami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                </div>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
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
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            KONTAKT
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Skontaktuj się z nami</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Masz pytania? Potrzebujesz pomocy? Nasz zespół jest gotowy, aby Ci pomóc.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Telefon</h3>
                </div>
                <p className="text-muted-foreground mb-2">Zadzwoń do nas w godzinach pracy</p>
                <p className="text-xl font-semibold text-primary">+48 58 123 45 67</p>
                <p className="text-sm text-muted-foreground mt-2">Pon-Pt: 8:00-18:00, Sob: 9:00-14:00</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Email</h3>
                </div>
                <p className="text-muted-foreground mb-2">Napisz do nas - odpowiemy w ciągu 24h</p>
                <p className="text-xl font-semibold text-primary">kontakt@legalnexus.pl</p>
                <p className="text-sm text-muted-foreground mt-2">Dla pilnych spraw: pilne@legalnexus.pl</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Adres</h3>
                </div>
                <p className="text-muted-foreground mb-2">Odwiedź nas w naszym biurze</p>
                <address className="not-italic">
                  <p className="font-semibold">Legal Nexus Sp. z o.o.</p>
                  <p>ul. Długa 46/47</p>
                  <p>80-831 Gdańsk</p>
                </address>
                <p className="text-sm text-muted-foreground mt-2">Centrum miasta, 5 min od Dworca Głównego</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Login Section
function LogowanieSection() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithEmail } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const { user, error } = await signInWithEmail(email, password)

    if (error) {
      alert(`Błąd logowania: ${error}`)
    } else if (user) {
      // Redirect based on role
      if (user.role === "admin") {
        window.location.href = "/admin"
      } else if (user.role === "operator") {
        window.location.href = "/panel-operatora"
      } else {
        window.location.href = "/panel-klienta"
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="py-20 bg-background">
      <div className="max-w-md mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Zaloguj się</CardTitle>
            <p className="text-muted-foreground">Uzyskaj dostęp do swojego panelu</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adres email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Wprowadź hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logowanie..." : "Zaloguj się"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Register Section
function RejestracjaSection() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUpWithEmail } = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Hasła nie są zgodne.")
      return
    }

    setIsLoading(true)
    const { user, error } = await signUpWithEmail(email, password)

    if (error) {
      alert(`Błąd rejestracji: ${error}`)
    } else if (user) {
      alert("Rejestracja pomyślna! Możesz się teraz zalogować.")
    }
    setIsLoading(false)
  }

  return (
    <div className="py-20 bg-background">
      <div className="max-w-md mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Zarejestruj się</CardTitle>
            <p className="text-muted-foreground">Utwórz nowe konto, aby uzyskać dostęp do platformy</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adres email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Wprowadź hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Potwierdź hasło</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Potwierdź hasło"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Rejestracja..." : "Zarejestruj się"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Other sections (simplified for brevity but with proper structure)
function AnalizaDokumentowSection() {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-4">
          ANALIZA DOKUMENTÓW
        </Badge>
        <h1 className="text-4xl font-bold mb-6">Profesjonalna analiza dokumentów prawnych</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Otrzymaj szczegółową analizę swoich dokumentów prawnych od doświadczonych prawników
        </p>
        <Button size="lg">Rozpocznij analizę dokumentów</Button>
      </div>
    </div>
  )
}

function PismaPrawneSection() {
  return (
    <div className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-4">
          PISMA PRAWNE
        </Badge>
        <h1 className="text-4xl font-bold mb-6">Profesjonalne pisma prawne</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Zlecaj przygotowanie pism prawnych doświadczonym prawnikom
        </p>
        <Button size="lg">Zamów pismo prawne</Button>
      </div>
    </div>
  )
}

function KonsultacjeSection() {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-4">
          KONSULTACJE
        </Badge>
        <h1 className="text-4xl font-bold mb-6">Konsultacje prawne online</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Skonsultuj swoją sprawę z doświadczonym prawnikiem
        </p>
        <Button size="lg">Umów konsultację</Button>
      </div>
    </div>
  )
}

function ReprezentacjaSection() {
  return (
    <div className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-4">
          REPREZENTACJA
        </Badge>
        <h1 className="text-4xl font-bold mb-6">Reprezentacja prawna</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Profesjonalna reprezentacja w sprawach sądowych i administracyjnych
        </p>
        <Button size="lg">Zapytaj o reprezentację</Button>
      </div>
    </div>
  )
}

function RegulaminSection() {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            REGULAMIN
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Regulamin świadczenia usług</h1>
        </div>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>§ 1 Postanowienia ogólne</h2>
          <p>
            Niniejszy Regulamin określa zasady świadczenia usług prawnych przez Legal Nexus Sp. z o.o. z siedzibą w
            Gdańsku.
          </p>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  )
}

function PolitykaPrywatnosciSection() {
  return (
    <div className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            POLITYKA PRYWATNOŚCI
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Polityka prywatności</h1>
        </div>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>1. Informacje ogólne</h2>
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych przez Legal Nexus Sp. z o.o.
          </p>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  )
}

function RODOSection() {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            RODO
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Informacje RODO</h1>
        </div>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>Ochrona danych osobowych</h2>
          <p>Legal Nexus Sp. z o.o. przestrzega przepisów RODO w zakresie ochrony danych osobowych.</p>
          {/* Add more content as needed */}
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
        "Przyjmujemy dokumenty w formatach PDF, DOC, DOCX, JPG, PNG. Maksymalny rozmiar pojedynczego pliku to 10MB.",
    },
    {
      question: "Czy mogę anulować zamówienie?",
      answer:
        "Tak, możesz anulować zamówienie do momentu rozpoczęcia prac przez prawnika. Po rozpoczęciu prac anulowanie nie jest możliwe.",
    },
    {
      question: "Jak mogę skontaktować się z prawnikiem?",
      answer: "Kontakt z prawnikiem odbywa się przez bezpieczną platformę wiadomości dostępną w panelu klienta.",
    },
  ]

  return (
    <div className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Często zadawane pytania</h1>
          <p className="text-xl text-muted-foreground">
            Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
          <Button size="lg">Skontaktuj się z nami</Button>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const { user } = useAuth()

  const handleSectionChange = (section: string) => {
    setActiveSection(section as Section)
  }

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
      case "blog":
        return <BlogSection />
      case "poradniki":
        return <PoradnikiSection />
      case "logowanie":
        return <LogowanieSection />
      case "rejestracja":
        return <RejestracjaSection />
      default:
        return <HomeSection />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSectionChange={handleSectionChange} activeSection={activeSection} />
      <main className="flex-1">{renderSection()}</main>
      <Footer />
    </div>
  )
}
