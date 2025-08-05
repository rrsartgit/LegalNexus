"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FileText, Clock, Shield, Users, Award } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { AsystentAISection } from "@/components/sections/asystent-ai-section"
import { BlogSection } from "@/components/sections/blog-section"
import { PoradnikiSection } from "@/components/sections/poradniki-section"

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("home")

  const handleNavigate = (section: string) => {
    setCurrentSection(section)
  }

  const handleBackToHome = () => {
    setCurrentSection("home")
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "asystent-ai":
        return <AsystentAISection onBack={handleBackToHome} />
      case "blog":
        return <BlogSection onBack={handleBackToHome} />
      case "poradniki":
        return <PoradnikiSection onBack={handleBackToHome} />
      default:
        return (
          <div className="min-h-screen bg-background">
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
          </div>
        )
    }
  }

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
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={handleNavigate} currentSection={currentSection} showMenuButton={true} />
      <main className="flex-1">{renderCurrentSection()}</main>
      {currentSection === "home" && <Footer />}
    </div>
  )
}
