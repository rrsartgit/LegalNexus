"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { AiAssistant } from "@/components/ai-assistant"
import { NewCaseForm } from "@/components/new-case-form"
import { LoginForm } from "@/frontend/components/LoginForm"
import { RegisterForm } from "@/frontend/components/RegisterForm"
import { Dashboard } from "@/frontend/components/Dashboard"
import { CreateOrderForm } from "@/frontend/components/CreateOrderForm"
import { KancelarieManager } from "@/frontend/components/KancelarieManager"
import { KlienciManager } from "@/frontend/components/KlienciManager"
import { OrdersList } from "@/frontend/components/OrdersList"
import { SprawyManager } from "@/frontend/components/SprawyManager"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <HeroSection onSectionChange={setActiveSection} />
            <FeaturesSection />
            <StatsSection />
          </>
        )
      case "jak-to-dziala":
        return (
          <section id="jak-to-dziala" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Jak to działa?
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    1
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Zarejestruj się</h3>
                  <p className="text-muted-foreground">Szybka i prosta rejestracja w naszym systemie.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    2
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Wybierz usługę</h3>
                  <p className="text-muted-foreground">
                    Wybierz spośród analizy dokumentów, pism prawnych, konsultacji lub reprezentacji.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    3
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Otrzymaj pomoc</h3>
                  <p className="text-muted-foreground">Nasi eksperci dostarczą Ci profesjonalną pomoc prawną.</p>
                </div>
              </div>
            </div>
          </section>
        )
      case "funkcje":
        return (
          <section id="funkcje" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Funkcje</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <h3 className="mt-4 text-xl font-bold">Analiza dokumentów</h3>
                  <p className="text-muted-foreground">Szybka i precyzyjna analiza dokumentów prawnych.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="mt-4 text-xl font-bold">Pisma prawne</h3>
                  <p className="text-muted-foreground">Profesjonalne przygotowanie pism prawnych.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="mt-4 text-xl font-bold">Konsultacje</h3>
                  <p className="text-muted-foreground">Indywidualne konsultacje z doświadczonymi prawnikami.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="mt-4 text-xl font-bold">Reprezentacja</h3>
                  <p className="text-muted-foreground">Reprezentacja w sądzie i przed organami administracji.</p>
                </div>
              </div>
            </div>
          </section>
        )
      case "blog":
        return (
          <section id="blog" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Blog</h2>
              <p className="text-muted-foreground text-center">Wkrótce pojawią się nowe wpisy na blogu!</p>
            </div>
          </section>
        )
      case "poradniki":
        return (
          <section id="poradniki" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Poradniki
              </h2>
              <p className="text-muted-foreground text-center">Wkrótce pojawią się nowe poradniki!</p>
            </div>
          </section>
        )
      case "o-nas":
        return (
          <section id="o-nas" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">O nas</h2>
              <p className="text-muted-foreground text-center">
                Jesteśmy zespołem doświadczonych prawników, którzy oferują kompleksową pomoc prawną.
              </p>
            </div>
          </section>
        )
      case "kontakt":
        return (
          <section id="kontakt" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Kontakt</h2>
              <p className="text-muted-foreground text-center">Skontaktuj się z nami, aby uzyskać więcej informacji.</p>
            </div>
          </section>
        )
      case "analiza-dokumentow":
        return (
          <section id="analiza-dokumentow" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Analiza dokumentów
              </h2>
              <p className="text-muted-foreground text-center">
                Oferujemy szybką i precyzyjną analizę dokumentów prawnych.
              </p>
              <AiAssistant />
            </div>
          </section>
        )
      case "pisma-prawne":
        return (
          <section id="pisma-prawne" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Pisma prawne
              </h2>
              <p className="text-muted-foreground text-center">Profesjonalne przygotowanie pism prawnych.</p>
              <NewCaseForm />
            </div>
          </section>
        )
      case "konsultacje":
        return (
          <section id="konsultacje" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Konsultacje
              </h2>
              <p className="text-muted-foreground text-center">Indywidualne konsultacje z doświadczonymi prawnikami.</p>
            </div>
          </section>
        )
      case "reprezentacja":
        return (
          <section id="reprezentacja" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Reprezentacja
              </h2>
              <p className="text-muted-foreground text-center">
                Reprezentacja w sądzie i przed organami administracji.
              </p>
            </div>
          </section>
        )
      case "regulamin":
        return (
          <section id="regulamin" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Regulamin
              </h2>
              <p className="text-muted-foreground text-center">Zapoznaj się z naszym regulaminem.</p>
            </div>
          </section>
        )
      case "polityka-prywatnosci":
        return (
          <section id="polityka-prywatnosci" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Polityka prywatności
              </h2>
              <p className="text-muted-foreground text-center">Przeczytaj naszą politykę prywatności.</p>
            </div>
          </section>
        )
      case "rodo":
        return (
          <section id="rodo" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">RODO</h2>
              <p className="text-muted-foreground text-center">Informacje dotyczące RODO.</p>
            </div>
          </section>
        )
      case "faq":
        return (
          <section id="faq" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">FAQ</h2>
              <p className="text-muted-foreground text-center">Najczęściej zadawane pytania.</p>
            </div>
          </section>
        )
      case "logowanie":
        return (
          <section id="logowanie" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 flex justify-center">
              <LoginForm />
            </div>
          </section>
        )
      case "rejestracja":
        return (
          <section id="rejestracja" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 flex justify-center">
              <RegisterForm />
            </div>
          </section>
        )
      case "cennik":
        return (
          <section id="cennik" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Cennik</h2>
              <p className="text-muted-foreground text-center">Szczegółowy cennik naszych usług.</p>
            </div>
          </section>
        )
      case "kancelarie":
        return (
          <section id="kancelarie" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Kancelarie
              </h2>
              <p className="text-muted-foreground text-center">Lista współpracujących kancelarii prawnych.</p>
              <KancelarieManager />
            </div>
          </section>
        )
      case "panel-klienta":
        return (
          <section id="panel-klienta" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Panel Klienta
              </h2>
              <Dashboard />
              <CreateOrderForm />
              <OrdersList />
            </div>
          </section>
        )
      case "admin":
        return (
          <section id="admin" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Panel Administratora
              </h2>
              <KlienciManager />
              <SprawyManager />
            </div>
          </section>
        )
      case "panel-operatora":
        return (
          <section id="panel-operatora" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Panel Operatora
              </h2>
              <OrdersList />
            </div>
          </section>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header onSectionChange={setActiveSection} activeSection={activeSection} />
      <main className="flex-1">{renderSection()}</main>
      <Footer />
    </>
  )
}
