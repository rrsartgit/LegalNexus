"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Home, Lightbulb, BarChart, Users, Phone, FileText, Scale, Gavel, Shield } from "lucide-react"
import Image from "next/image"

// Mock data for sections
const mockBlogPosts = [
  {
    id: 1,
    title: "Nowe regulacje RODO w 2024: Co musisz wiedzieć?",
    summary:
      "Przegląd najważniejszych zmian w przepisach o ochronie danych osobowych, które weszły w życie w 2024 roku.",
    date: "2024-07-20",
    author: "Anna Kowalska",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Sztuczna inteligencja w kancelarii prawnej: Przyszłość już dziś",
    summary: "Jak AI zmienia pracę prawników i jakie narzędzia warto wdrożyć w swojej praktyce.",
    date: "2024-07-15",
    author: "Piotr Nowak",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Mediacja czy sąd? Kiedy wybrać alternatywne metody rozwiązywania sporów",
    summary: "Analiza zalet i wad mediacji oraz postępowania sądowego w kontekście różnych typów spraw.",
    date: "2024-07-10",
    author: "Marta Wiśniewska",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const mockGuides = [
  {
    id: 1,
    title: "Jak napisać skuteczne odwołanie od decyzji administracyjnej?",
    summary: "Krok po kroku, jak przygotować i złożyć odwołanie, aby zwiększyć swoje szanse na sukces.",
    date: "2024-07-22",
    author: "LegalNexus Team",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Umowa najmu mieszkania: Kluczowe klauzule i na co zwrócić uwagę",
    summary: "Praktyczny przewodnik dla najemców i wynajmujących, aby uniknąć pułapek prawnych.",
    date: "2024-07-18",
    author: "LegalNexus Team",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Spadek i dziedziczenie: Podstawy prawne i procedury",
    summary: "Wszystko, co musisz wiedzieć o prawie spadkowym, testamentach i dziedziczeniu ustawowym.",
    date: "2024-07-12",
    author: "LegalNexus Team",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "jak-to-dziala",
        "funkcje",
        "blog",
        "poradniki",
        "o-nas",
        "kontakt",
        "analiza-dokumentow",
        "pisma-prawne",
        "konsultacje",
        "reprezentacja",
        "regulamin",
        "polityka-prywatnosci",
        "rodo",
        "faq",
      ]
      const scrollPosition = window.scrollY + window.innerHeight / 2 // Offset for better active section detection

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const HeroSection = () => (
    <section
      id="home"
      className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter">
            PROFESJONALNA POMOC PRAWNA
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
            Otrzymałeś pismo prawne? Pomożemy Ci! Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w ciągu 24
            godzin. Profesjonalnie, szybko i w przystępnej cenie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300"
              onClick={() => scrollToSection("analiza-dokumentow")}
            >
              Zamów Analizę
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 bg-transparent"
              onClick={() => scrollToSection("jak-to-dziala")}
            >
              Zobacz Przykłady
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Gavel"
            width={400}
            height={400}
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
      {/* Background shapes for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600 opacity-10 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500 opacity-10 rounded-full filter blur-3xl" />
      </div>
    </section>
  )

  const JakToDzialaSection = () => (
    <section id="jak-to-dziala" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Jak to działa?</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Nasz proces jest prosty i intuicyjny, zaprojektowany, aby zapewnić Ci szybką i skuteczną pomoc prawną.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <FileText className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">1. Prześlij dokument</h3>
              <p className="text-gray-500">
                Załaduj swoje pismo prawne lub dokument, który wymaga analizy. Akceptujemy różne formaty.
              </p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <Scale className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">2. Analiza i przygotowanie</h3>
              <p className="text-gray-500">
                Nasi eksperci analizują dokument i przygotowują profesjonalną odpowiedź lub opinię prawną.
              </p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <Gavel className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">3. Odbierz gotowe rozwiązanie</h3>
              <p className="text-gray-500">Gotowy dokument otrzymasz w ciągu 24 godzin, gotowy do użycia.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  const FunkcjeSection = () => (
    <section id="funkcje" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Nasze Funkcje</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Oferujemy kompleksowe rozwiązania, które usprawnią Twoje procesy prawne.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <FileText className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-semibold">Analiza Dokumentów</h3>
              <p className="text-gray-500">Szybka i precyzyjna analiza pism prawnych, umów i innych dokumentów.</p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <Scale className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-semibold">Pisma Prawne</h3>
              <p className="text-gray-500">Generowanie profesjonalnych pism procesowych, wniosków i opinii.</p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <Phone className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-semibold">Konsultacje Online</h3>
              <p className="text-gray-500">Dostęp do doświadczonych prawników poprzez konsultacje wideo lub czat.</p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <Gavel className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-semibold">Reprezentacja Sądowa</h3>
              <p className="text-gray-500">Wsparcie w reprezentacji przed sądami i organami administracji.</p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <BarChart className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-semibold">Panel Klienta</h3>
              <p className="text-gray-500">Intuicyjny panel do zarządzania swoimi sprawami i dokumentami.</p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              <Users className="h-10 w-10 text-blue-600" />
              <h3 className="text-xl font-semibold">Wsparcie AI</h3>
              <p className="text-gray-500">Asystent AI wspierający w analizie i generowaniu treści prawnych.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  const BlogSection = () => (
    <section id="blog" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Nasz Blog</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Bądź na bieżąco z najnowszymi trendami i zmianami w prawie.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockBlogPosts.map((post) => (
            <Card key={post.id} className="p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-left mb-2">{post.title}</h3>
              <p className="text-gray-600 text-left text-sm mb-4">{post.summary}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
            </Card>
          ))}
        </div>
        <Button className="mt-12" onClick={() => scrollToSection("blog")}>
          Zobacz więcej artykułów
        </Button>
      </div>
    </section>
  )

  const PoradnikiSection = () => (
    <section id="poradniki" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Poradniki Prawne</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Praktyczne przewodniki, które pomogą Ci zrozumieć skomplikowane zagadnienia prawne.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockGuides.map((guide) => (
            <Card key={guide.id} className="p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={guide.image || "/placeholder.svg"}
                alt={guide.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-left mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-left text-sm mb-4">{guide.summary}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{guide.date}</span>
                <span>{guide.author}</span>
              </div>
            </Card>
          ))}
        </div>
        <Button className="mt-12" onClick={() => scrollToSection("poradniki")}>
          Zobacz więcej poradników
        </Button>
      </div>
    </section>
  )

  const ONasSection = () => (
    <section id="o-nas" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">O nas</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Jesteśmy zespołem pasjonatów prawa i technologii, którzy wierzą, że dostęp do profesjonalnej pomocy prawnej
          powinien być prosty i efektywny.
        </p>

        <div className="space-y-12">
          {/* Nasze Wartości */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Nasze Wartości</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 shadow-lg">
                <CardContent className="flex flex-col items-center space-y-4">
                  <Shield className="h-10 w-10 text-blue-600" />
                  <h4 className="text-xl font-semibold">Profesjonalizm</h4>
                  <p className="text-gray-500">
                    Działamy z najwyższą starannością i dbałością o szczegóły, zapewniając usługi na najwyższym
                    poziomie.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg">
                <CardContent className="flex flex-col items-center space-y-4">
                  <Lightbulb className="h-10 w-10 text-blue-600" />
                  <h4 className="text-xl font-semibold">Innowacyjność</h4>
                  <p className="text-gray-500">
                    Stale rozwijamy nasze technologie, aby dostarczać najnowocześniejsze rozwiązania prawne.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg">
                <CardContent className="flex flex-col items-center space-y-4">
                  <Users className="h-10 w-10 text-blue-600" />
                  <h4 className="text-xl font-semibold">Dostępność</h4>
                  <p className="text-gray-500">
                    Upraszczamy dostęp do usług prawnych, czyniąc je bardziej przystępnymi dla każdego.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const KontaktSection = () => (
    <section id="kontakt" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Skontaktuj się z nami</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Masz pytania? Chętnie na nie odpowiemy. Wypełnij formularz lub skontaktuj się z nami bezpośrednio.
        </p>
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <Card className="p-6 shadow-lg">
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Formularz Kontaktowy</h3>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Imię i Nazwisko</Label>
                  <Input id="name" placeholder="Twoje imię i nazwisko" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Twój adres email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Wiadomość</Label>
                  <Textarea id="message" placeholder="Twoja wiadomość..." className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">
                  Wyślij Wiadomość
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg">
            <CardContent className="space-y-4 text-left">
              <h3 className="text-xl font-semibold mb-4">Dane Kontaktowe</h3>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">Telefon:</p>
                  <p className="text-gray-600">+48 123 456 789</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-gray-600">kontakt@legalnexus.pl</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Home className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">Adres:</p>
                  <p className="text-gray-600">ul. Przykładowa 1, 00-001 Warszawa</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Godziny Otwarcia</h4>
                <p className="text-gray-600">Poniedziałek - Piątek: 9:00 - 17:00</p>
                <p className="text-gray-600">Sobota - Niedziela: Zamknięte</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  const AnalizaDokumentowSection = () => (
    <section id="analiza-dokumentow" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Analiza Dokumentów</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">Szybka i precyzyjna analiza Twoich dokumentów prawnych.</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-8 py-3 text-lg">Zamów Analizę Dokumentów</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Zamów Analizę Dokumentów</DialogTitle>
              <DialogDescription>Wypełnij formularz, aby zamówić analizę swojego dokumentu prawnego.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="document-type">Rodzaj dokumentu</Label>
                <Input id="document-type" placeholder="Np. umowa, pozew, pismo urzędowe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Opis sprawy</Label>
                <Textarea id="description" placeholder="Krótki opis kontekstu sprawy" className="min-h-[100px]" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">Załącz dokument</Label>
                <Input id="file" type="file" />
              </div>
              <Button type="submit">Wyślij Zamówienie</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )

  const PismaPrawneSection = () => (
    <section id="pisma-prawne" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Pisma Prawne</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Potrzebujesz profesjonalnego pisma? Przygotujemy je dla Ciebie.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-8 py-3 text-lg">Zamów Pismo Prawne</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Zamów Pismo Prawne</DialogTitle>
              <DialogDescription>Wypełnij formularz, aby zamówić przygotowanie pisma prawnego.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="letter-type">Rodzaj pisma</Label>
                <Input id="letter-type" placeholder="Np. pozew, wniosek, odwołanie" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">Szczegóły sprawy</Label>
                <Textarea id="details" placeholder="Podaj wszystkie niezbędne szczegóły" className="min-h-[100px]" />
              </div>
              <Button type="submit">Wyślij Zamówienie</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )

  const KonsultacjeSection = () => (
    <section id="konsultacje" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Konsultacje Prawne</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">Uzyskaj poradę od doświadczonych prawników online.</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-8 py-3 text-lg">Umów Konsultację</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Umów Konsultację Prawną</DialogTitle>
              <DialogDescription>Wybierz dogodny termin i rodzaj konsultacji.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="consultation-type">Rodzaj konsultacji</Label>
                <Input id="consultation-type" placeholder="Np. telefoniczna, wideo, czat" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="preferred-date">Preferowana data</Label>
                <Input id="preferred-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="preferred-time">Preferowana godzina</Label>
                <Input id="preferred-time" type="time" />
              </div>
              <Button type="submit">Umów Spotkanie</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )

  const ReprezentacjaSection = () => (
    <section id="reprezentacja" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Reprezentacja Prawna</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Zapewniamy profesjonalną reprezentację przed sądami i urzędami.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-8 py-3 text-lg">Zapytaj o Reprezentację</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Zapytaj o Reprezentację Prawną</DialogTitle>
              <DialogDescription>Opisz swoją sprawę, a my skontaktujemy się z Tobą.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="case-summary">Krótki opis sprawy</Label>
                <Textarea id="case-summary" placeholder="Opisz krótko swoją sprawę" className="min-h-[100px]" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-phone">Numer telefonu</Label>
                <Input id="contact-phone" type="tel" placeholder="Twój numer telefonu" />
              </div>
              <Button type="submit">Wyślij Zapytanie</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )

  const RegulaminSection = () => (
    <section id="regulamin" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 text-center">Regulamin</h2>
        <div className="prose max-w-none mx-auto text-gray-700">
          <h3>1. Postanowienia Ogólne</h3>
          <p>
            Niniejszy regulamin określa zasady korzystania z serwisu Legal API Nexus, dostępnego pod adresem [adres
            strony]. Korzystanie z serwisu oznacza akceptację niniejszego regulaminu.
          </p>
          <h3>2. Usługi</h3>
          <p>
            Serwis Legal API Nexus świadczy usługi w zakresie analizy dokumentów prawnych, przygotowywania pism
            prawnych, konsultacji prawnych online oraz wsparcia w reprezentacji prawnej.
          </p>
          <h3>3. Odpowiedzialność</h3>
          <p>
            Legal API Nexus dokłada wszelkich starań, aby świadczone usługi były najwyższej jakości. Nie ponosimy
            odpowiedzialności za szkody wynikające z niewłaściwego wykorzystania dostarczonych informacji.
          </p>
          <h3>4. Ochrona Danych Osobowych</h3>
          <p>
            Wszelkie dane osobowe przetwarzane są zgodnie z obowiązującymi przepisami prawa, w tym RODO. Szczegółowe
            informacje na temat przetwarzania danych znajdują się w Polityce Prywatności.
          </p>
          <h3>5. Postanowienia Końcowe</h3>
          <p>
            W sprawach nieuregulowanych niniejszym regulaminem mają zastosowanie przepisy prawa polskiego. Wszelkie
            spory wynikające z niniejszego regulaminu będą rozstrzygane przez sąd właściwy dla siedziby Legal API Nexus.
          </p>
        </div>
      </div>
    </section>
  )

  const PolitykaPrywatnosciSection = () => (
    <section id="polityka-prywatnosci" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 text-center">Polityka Prywatności</h2>
        <div className="prose max-w-none mx-auto text-gray-700">
          <h3>1. Wprowadzenie</h3>
          <p>
            Niniejsza Polityka Prywatności określa zasady gromadzenia, przetwarzania i ochrony danych osobowych
            użytkowników serwisu Legal API Nexus.
          </p>
          <h3>2. Administrator Danych Osobowych</h3>
          <p>Administratorem Twoich danych osobowych jest Legal API Nexus Sp. z o.o. z siedzibą w [adres].</p>
          <h3>3. Rodzaje Gromadzonych Danych</h3>
          <p>
            Gromadzimy dane takie jak imię, nazwisko, adres e-mail, numer telefonu, dane dotyczące płatności oraz
            informacje związane z korzystaniem z naszych usług.
          </p>
          <h3>4. Cel Przetwarzania Danych</h3>
          <p>
            Dane osobowe przetwarzane są w celu świadczenia usług, obsługi płatności, komunikacji z użytkownikami, a
            także w celach marketingowych i analitycznych.
          </p>
          <h3>5. Prawa Użytkownika</h3>
          <p>
            Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do
            przenoszenia danych oraz prawo do wniesienia sprzeciwu.
          </p>
          <h3>6. Bezpieczeństwo Danych</h3>
          <p>
            Stosujemy odpowiednie środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo Twoich danych
            osobowych.
          </p>
          <h3>7. Zmiany w Polityce Prywatności</h3>
          <p>
            Niniejsza Polityka Prywatności może być aktualizowana. O wszelkich zmianach będziemy informować
            użytkowników.
          </p>
        </div>
      </div>
    </section>
  )

  const RodoSection = () => (
    <section id="rodo" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 text-center">RODO</h2>
        <div className="prose max-w-none mx-auto text-gray-700">
          <h3>1. Czym jest RODO?</h3>
          <p>
            RODO (Rozporządzenie Ogólne o Ochronie Danych Osobowych) to unijne rozporządzenie, które weszło w życie 25
            maja 2018 roku. Ma na celu ujednolicenie przepisów dotyczących ochrony danych osobowych w całej Unii
            Europejskiej.
          </p>
          <h3>2. Nasze podejście do RODO</h3>
          <p>
            W Legal API Nexus w pełni przestrzegamy zasad RODO. Zapewniamy, że Twoje dane osobowe są przetwarzane w
            sposób legalny, rzetelny i przejrzysty.
          </p>
          <h3>3. Twoje prawa wynikające z RODO</h3>
          <ul>
            <li>Prawo do informacji o przetwarzaniu danych.</li>
            <li>Prawo dostępu do swoich danych.</li>
            <li>Prawo do sprostowania danych.</li>
            <li>Prawo do usunięcia danych ("prawo do bycia zapomnianym").</li>
            <li>Prawo do ograniczenia przetwarzania.</li>
            <li>Prawo do przenoszenia danych.</li>
            <li>Prawo do wniesienia sprzeciwu.</li>
            <li>Prawo do niepodlegania decyzjom opartym wyłącznie na zautomatyzowanym przetwarzaniu.</li>
          </ul>
          <h3>4. Kontakt w sprawach RODO</h3>
          <p>
            W przypadku pytań dotyczących przetwarzania Twoich danych osobowych zgodnie z RODO, prosimy o kontakt pod
            adresem: rodo@legalnexus.pl
          </p>
        </div>
      </div>
    </section>
  )

  const FaqSection = () => (
    <section id="faq" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">Najczęściej Zadawane Pytania</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Jak szybko otrzymam odpowiedź?</h3>
            <p className="text-gray-600">
              Standardowo analizę dokumentów i przygotowanie odpowiedzi realizujemy w ciągu 24 godzin.
            </p>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Czy mogę zaufać Waszym prawnikom?</h3>
            <p className="text-gray-600">
              Współpracujemy wyłącznie z doświadczonymi i zweryfikowanymi prawnikami, którzy gwarantują najwyższą jakość
              usług.
            </p>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Jakie dokumenty mogę przesłać do analizy?</h3>
            <p className="text-gray-600">
              Akceptujemy szeroki zakres dokumentów, w tym umowy, pozwy, pisma urzędowe, decyzje administracyjne i inne.
            </p>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Czy oferujecie konsultacje wideo?</h3>
            <p className="text-gray-600">
              Tak, oferujemy konsultacje telefoniczne, wideo oraz poprzez czat, aby dostosować się do Twoich potrzeb.
            </p>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Jakie są metody płatności?</h3>
            <p className="text-gray-600">
              Akceptujemy płatności kartą, przelewem bankowym oraz popularne systemy płatności online.
            </p>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Czy moje dane są bezpieczne?</h3>
            <p className="text-gray-600">
              Stosujemy zaawansowane środki bezpieczeństwa i szyfrowanie, aby chronić Twoje dane osobowe.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSectionChange={scrollToSection} activeSection={activeSection} />
      <main className="flex-1">
        <HeroSection />
        <JakToDzialaSection />
        <FunkcjeSection />
        <BlogSection />
        <PoradnikiSection />
        <ONasSection />
        <KontaktSection />
        {/* Sections that are not directly linked in main nav but might be accessed via modals or direct links */}
        <AnalizaDokumentowSection />
        <PismaPrawneSection />
        <KonsultacjeSection />
        <ReprezentacjaSection />
        <RegulaminSection />
        <PolitykaPrywatnosciSection />
        <RodoSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
