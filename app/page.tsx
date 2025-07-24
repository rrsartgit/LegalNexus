"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { AIAssistant } from "@/components/ai-assistant"

// About Us Components
function AboutSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">O Nas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Poznaj naszą historię, misję i zespół, który tworzy przyszłość technologii prawniczych w Polsce
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Misja i Wizja Firmy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Nasza Misja</h3>
              <p className="text-gray-700 leading-relaxed">
                Wspieramy kancelarie prawne w całej Polsce poprzez dostarczanie nowoczesnych, bezpiecznych i
                intuicyjnych narzędzi informatycznych, które zwiększają efektywność pracy prawników i poprawiają jakość
                obsługi klientów.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Nasza Wizja</h3>
              <p className="text-gray-700 leading-relaxed">
                Chcemy być wiodącym dostawcą technologii prawniczych w Polsce, tworząc rozwiązania, które przekształcają
                tradycyjną praktykę prawną w nowoczesną, efektywną i dostępną usługę dla wszystkich obywateli.
              </p>
            </div>
          </div>
        </div>

        {/* Development History */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Historia Rozwoju</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <p className="text-gray-700 mb-6">Kluczowe momenty w rozwoju naszej firmy i produktów:</p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">2020 - Założenie firmy</h4>
                  <p className="text-gray-600">Rozpoczęcie prac nad pierwszymi rozwiązaniami dla branży prawniczej</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">2021 - Pierwszy produkt</h4>
                  <p className="text-gray-600">Uruchomienie systemu zarządzania sprawami dla kancelarii</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">2022 - Ekspansja</h4>
                  <p className="text-gray-600">Rozszerzenie oferty o narzędzia AI i automatyzację procesów</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">2023 - Innowacje</h4>
                  <p className="text-gray-600">Wprowadzenie zaawansowanych funkcji analizy dokumentów prawnych</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">2024 - Przyszłość</h4>
                  <p className="text-gray-600">Kontynuacja rozwoju i wprowadzanie kolejnych innowacyjnych rozwiązań</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Zespół Kierowniczy</h2>
          <p className="text-center text-gray-600 mb-8">
            Doświadczeni profesjonaliści łączący wiedzę prawniczą z ekspertyzą technologiczną
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Anna Kowalska</h3>
              <p className="text-blue-600 font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">15 lat doświadczenia w branży prawniczej i technologicznej</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Michał Nowak</h3>
              <p className="text-indigo-600 font-medium mb-2">CTO</p>
              <p className="text-gray-600 text-sm">Ekspert w dziedzinie sztucznej inteligencji i systemów prawnych</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Katarzyna Wiśniewska</h3>
              <p className="text-green-600 font-medium mb-2">Head of Legal</p>
              <p className="text-gray-600 text-sm">Prawnik z 12-letnim doświadczeniem w kancelariach prawnych</p>
            </div>
          </div>
        </div>

        {/* Office in Gdansk */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Nasze Biuro w Gdańsku</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Serce naszych operacji</h3>
                <p className="text-gray-700 mb-4">
                  Nasze główne biuro znajduje się w sercu Gdańska, w nowoczesnym kompleksie biurowym przy ul. Długiej.
                  To tutaj nasz zespół tworzy innowacyjne rozwiązania dla branży prawniczej.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>Adres:</strong> ul. Długa 123, 80-831 Gdańsk
                  </p>
                  <p className="text-gray-600">
                    <strong>Telefon:</strong> +48 58 123 45 67
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> kontakt@legalapinexus.pl
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Zdjęcie biura w Gdańsku</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Services Components
function ServicesSection() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nasze Usługi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kompleksowe rozwiązania prawne wspierane najnowszymi technologiami
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Analiza Dokumentów</h3>
            <p className="text-gray-700 mb-6">
              Automatyczna analiza i klasyfikacja dokumentów prawnych z wykorzystaniem sztucznej inteligencji.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Rozpoznawanie typu dokumentu</li>
              <li>• Wyciąganie kluczowych informacji</li>
              <li>• Sprawdzanie zgodności z przepisami</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Konsultacje Online</h3>
            <p className="text-gray-700 mb-6">
              Profesjonalne konsultacje prawne dostępne 24/7 przez naszą platformę online.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Konsultacje wideo i chat</li>
              <li>• Dostęp do ekspertów prawnych</li>
              <li>• Dokumentacja rozmów</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Reprezentacja Prawna</h3>
            <p className="text-gray-700 mb-6">
              Kompleksowa reprezentacja prawna w sprawach cywilnych, karnych i gospodarczych.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Doświadczeni prawnicy</li>
              <li>• Pełna reprezentacja w sądzie</li>
              <li>• Przygotowanie dokumentacji</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Blog Section
function BlogSection() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog Prawniczy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Najnowsze informacje, analizy i komentarze z świata prawa
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <article
              key={item}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">Prawo Cywilne</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Najważniejsze zmiany w kodeksie cywilnym 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Przegląd najważniejszych zmian legislacyjnych, które weszły w życie w tym roku...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">15 marca 2024</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Czytaj więcej →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

// Guides Section
function GuidesSection() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Poradniki Prawne</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Praktyczne przewodniki i instrukcje krok po kroku</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Jak założyć spółkę z o.o.?",
              description: "Kompletny przewodnik po zakładaniu spółki z ograniczoną odpowiedzialnością",
              steps: 8,
              time: "30 min",
            },
            {
              title: "Procedura rozwodowa",
              description: "Wszystko co musisz wiedzieć o procesie rozwodowym w Polsce",
              steps: 12,
              time: "45 min",
            },
            {
              title: "Ochrona danych osobowych",
              description: "RODO w praktyce - jak chronić dane osobowe w firmie",
              steps: 6,
              time: "25 min",
            },
            {
              title: "Umowy najmu lokali",
              description: "Jak prawidłowo przygotować i podpisać umowę najmu",
              steps: 10,
              time: "35 min",
            },
          ].map((guide, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{guide.title}</h3>
              <p className="text-gray-700 mb-6">{guide.description}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-600">{guide.steps} kroków</span>
                <span className="text-sm text-gray-600">~{guide.time} czytania</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Rozpocznij przewodnik
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Contact Section
function ContactSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Kontakt</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Skontaktuj się z nami - jesteśmy tutaj, aby Ci pomóc
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Wyślij nam wiadomość</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imię i nazwisko</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="jan@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temat</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="W czym możemy pomóc?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wiadomość</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Opisz swoją sprawę..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Wyślij wiadomość
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Informacje kontaktowe</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Adres</h3>
                  <p className="text-gray-600">
                    ul. Długa 123
                    <br />
                    80-831 Gdańsk
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telefon</h3>
                  <p className="text-gray-600">+48 58 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">kontakt@legalapinexus.pl</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Godziny pracy</h3>
                  <p className="text-gray-600">
                    Pon-Pt: 8:00 - 18:00
                    <br />
                    Sob: 9:00 - 14:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div>
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <AIAssistant />
          </div>
        )
      case "about":
        return <AboutSection />
      case "services":
        return <ServicesSection />
      case "blog":
        return <BlogSection />
      case "guides":
        return <GuidesSection />
      case "contact":
        return <ContactSection />
      // Commented out sections for future use
      // case 'pricing':
      //   return <PricingSection />
      // case 'api-docs':
      //   return <ApiDocsSection />
      // case 'law-firms':
      //   return <LawFirmsSection />
      default:
        return (
          <div>
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <AIAssistant />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSectionChange={setActiveSection} activeSection={activeSection} />
      <main>{renderSection()}</main>
      <Footer />
    </div>
  )
}
