"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Brain, FileText, Gavel, Scale, ShieldCheck, Users } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { LoginForm } from "@/frontend/components/LoginForm"
import { RegisterForm } from "@/frontend/components/RegisterForm"

export default function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("hero")
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
    setIsRegisterModalOpen(false)
  }

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true)
    setIsLoginModalOpen(false)
  }

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false)
    if (user?.role === "admin") {
      router.push("/admin")
    } else if (user?.role === "operator") {
      router.push("/panel-operatora")
    } else {
      router.push("/panel-klienta")
    }
  }

  const handleRegisterSuccess = () => {
    setIsRegisterModalOpen(false)
    router.push("/panel-klienta") // Default redirect for new users
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section
          id="hero"
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Legal API Nexus: Profesjonalna Pomoc Prawna na Wyciągnięcie Ręki
                  </h1>
                  <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                    Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w ciągu 24 godzin. Profesjonalnie, szybko i
                    w przystępnej cenie.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {user ? (
                    <Button
                      onClick={() =>
                        router.push(
                          user.role === "admin"
                            ? "/admin"
                            : user.role === "operator"
                              ? "/panel-operatora"
                              : "/panel-klienta",
                        )
                      }
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground text-primary px-8 text-sm font-medium shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Przejdź do Panelu
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleRegisterClick}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground text-primary px-8 text-sm font-medium shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      >
                        Zarejestruj się
                      </Button>
                      <Button
                        onClick={handleLoginClick}
                        variant="outline"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-transparent text-primary-foreground px-8 text-sm font-medium shadow-sm transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      >
                        Zaloguj się
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <img
                src="/placeholder.svg?height=400&width=600"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nasze Główne Funkcje</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Legal API Nexus oferuje kompleksowe rozwiązania dla kancelarii prawnych i klientów indywidualnych.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col items-center p-6 text-center">
                <FileText className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Analiza Dokumentów</CardTitle>
                <CardContent className="text-muted-foreground p-0">
                  Szybka i precyzyjna analiza dokumentów prawnych z wykorzystaniem zaawansowanej sztucznej inteligencji.
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Asystent AI</CardTitle>
                <CardContent className="text-muted-foreground p-0">
                  Inteligentny asystent prawny, który odpowiada na pytania i generuje pisma.
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center">
                <Gavel className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Reprezentacja Prawna</CardTitle>
                <CardContent className="text-muted-foreground p-0">
                  Łączymy klientów z doświadczonymi kancelariami prawnymi w całej Polsce.
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center">
                <Scale className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Zarządzanie Sprawami</CardTitle>
                <CardContent className="text-muted-foreground p-0">
                  Kompleksowe narzędzia do zarządzania sprawami, klientami i dokumentacją.
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center">
                <Users className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Panel Klienta</CardTitle>
                <CardContent className="text-muted-foreground p-0">
                  Intuicyjny panel dla klientów do śledzenia postępów spraw i komunikacji.
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center">
                <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Bezpieczeństwo Danych</CardTitle>
                <CardContent className="text-muted-foreground p-0">
                  Najwyższe standardy bezpieczeństwa w celu ochrony Twoich danych prawnych.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Jak to Działa?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Prosty proces, który zapewnia szybką i efektywną pomoc prawną.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg?height=310&width=550"
                width="550"
                height="310"
                alt="How it Works"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">1. Prześlij Dokumenty</h3>
                      <p className="text-muted-foreground">
                        Bezpiecznie prześlij swoje dokumenty prawne do analizy za pośrednictwem naszej platformy.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">2. Analiza AI</h3>
                      <p className="text-muted-foreground">
                        Nasza zaawansowana sztuczna inteligencja analizuje treść dokumentów, identyfikując kluczowe
                        informacje.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">3. Otrzymaj Odpowiedź</h3>
                      <p className="text-muted-foreground">
                        W ciągu 24 godzin otrzymasz szczegółową analizę i propozycje rozwiązań.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="about-us" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">O Nas</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Legal API Nexus to innowacyjna platforma, która rewolucjonizuje dostęp do usług prawnych.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Nasza Misja</h3>
                  <p className="text-muted-foreground">
                    Naszą misją jest uczynienie pomocy prawnej bardziej dostępną, efektywną i przystępną cenowo dla
                    każdego. Wierzymy, że technologia może zrewolucjonizować branżę prawniczą, zapewniając szybkie i
                    precyzyjne rozwiązania.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Nasz Zespół</h3>
                  <p className="text-muted-foreground">
                    Jesteśmy zespołem doświadczonych prawników, programistów i ekspertów AI, którzy połączyli siły, aby
                    stworzyć platformę, która spełnia najwyższe standardy jakości i bezpieczeństwa.
                  </p>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=310&width=550"
                width="550"
                height="310"
                alt="About Us"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Skontaktuj się z Nami</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Masz pytania? Chętnie odpowiemy!
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md py-12">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Imię i Nazwisko
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="name"
                    placeholder="Twoje imię i nazwisko"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="Twój adres email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Wiadomość
                  </label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="message"
                    placeholder="Twoja wiadomość"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">
                  Wyślij Wiadomość
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Zaloguj się</DialogTitle>
            <DialogDescription>Wprowadź swoje dane, aby uzyskać dostęp do konta.</DialogDescription>
          </DialogHeader>
          <LoginForm onSuccess={handleLoginSuccess} />
          <Button variant="link" onClick={handleRegisterClick}>
            Nie masz konta? Zarejestruj się
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Zarejestruj się</DialogTitle>
            <DialogDescription>Utwórz nowe konto, aby korzystać z naszych usług.</DialogDescription>
          </DialogHeader>
          <RegisterForm onSuccess={handleRegisterSuccess} />
          <Button variant="link" onClick={handleLoginClick}>
            Masz już konto? Zaloguj się
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
