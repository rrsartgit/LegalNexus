"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Scale, Briefcase, Handshake } from "lucide-react"

export default function ReprezentacjaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do strony głównej
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Reprezentacja Prawna</h1>
        <p className="text-lg text-gray-700 mb-8">
          W LegalNexus oferujemy kompleksową reprezentację prawną w sprawach sądowych, administracyjnych oraz w
          negocjacjach. Nasi prawnicy z Gdańska zapewnią Ci wsparcie na każdym etapie postępowania, dbając o Twoje
          interesy i dążąc do najkorzystniejszego rozwiązania.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Scale className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Wsparcie Sądowe</h2>
            <p className="text-gray-600">
              Reprezentujemy klientów przed sądami wszystkich instancji, w sprawach cywilnych, karnych i rodzinnych.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Briefcase className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Sprawy Administracyjne</h2>
            <p className="text-gray-600">
              Pomagamy w załatwianiu formalności i reprezentujemy w postępowaniach przed organami administracji.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Handshake className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Negocjacje i Mediacje</h2>
            <p className="text-gray-600">
              Prowadzimy negocjacje w imieniu klienta, dążąc do polubownego rozwiązania sporów.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">Jak uzyskać reprezentację?</h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-3 mb-12">
          <li>Skontaktuj się z nami, aby umówić wstępną konsultację i przedstawić swoją sprawę.</li>
          <li>Nasi prawnicy ocenią sytuację i przedstawią plan działania oraz kosztorys.</li>
          <li>Po akceptacji warunków, udziel nam pełnomocnictwa.</li>
          <li>Będziemy Cię na bieżąco informować o postępach w sprawie.</li>
          <li>Działamy w Twoim imieniu, dążąc do osiągnięcia zamierzonych celów.</li>
        </ol>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/zamow-analize">Skontaktuj się w sprawie Reprezentacji</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
