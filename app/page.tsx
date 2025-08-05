"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
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
      case "home":
      default:
        return (
          <>
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} currentSection={currentSection} showMenuButton={true} />
      <main>{renderCurrentSection()}</main>
      {currentSection === "home" && <Footer />}
    </div>
  )
}
