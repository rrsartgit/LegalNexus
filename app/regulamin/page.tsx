"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RegulaminPage() {
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

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Regulamin Świadczenia Usług</h1>
        <p className="text-lg text-gray-700 mb-8">
          Niniejszy Regulamin określa zasady korzystania z usług świadczonych przez LegalNexus z siedzibą w Gdańsku,
          dostępnych za pośrednictwem platformy internetowej. Prosimy o dokładne zapoznanie się z jego treścią przed
          rozpoczęciem korzystania z naszych usług.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Postanowienia Ogólne</h2>
        <p className="text-gray-700 mb-4">
          1.1. Właścicielem i operatorem platformy LegalNexus jest [Nazwa Firmy/Kancelarii], z siedzibą w Gdańsku,
          [Adres], NIP: [NIP], REGON: [REGON].
        </p>
        <p className="text-gray-700 mb-4">
          1.2. Regulamin określa prawa i obowiązki Użytkowników oraz Usługodawcy w związku ze świadczeniem usług
          prawnych online.
        </p>
        <p className="text-gray-700 mb-8">1.3. Korzystanie z platformy oznacza akceptację niniejszego Regulaminu.</p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Rodzaje i Zakres Usług</h2>
        <p className="text-gray-700 mb-4">
          2.1. LegalNexus świadczy usługi prawne online, w szczególności: analizę dokumentów prawnych, przygotowanie
          pism prawnych, konsultacje prawne.
        </p>
        <p className="text-gray-700 mb-8">
          2.2. Szczegółowy opis każdej usługi, jej zakres oraz cennik dostępne są na odpowiednich podstronach serwisu.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Zasady Korzystania z Usług</h2>
        <p className="text-gray-700 mb-4">
          3.1. Aby skorzystać z usług, Użytkownik musi dokonać rejestracji konta na platformie.
        </p>
        <p className="text-gray-700 mb-4">
          3.2. Użytkownik zobowiązany jest do podania prawdziwych i aktualnych danych.
        </p>
        <p className="text-gray-700 mb-8">
          3.3. Płatności za usługi dokonywane są za pośrednictwem dostępnych na platformie metod płatności.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Odpowiedzialność</h2>
        <p className="text-gray-700 mb-4">
          4.1. Usługodawca dokłada wszelkich starań, aby świadczone usługi były najwyższej jakości i zgodne z
          obowiązującym prawem.
        </p>
        <p className="text-gray-700 mb-8">
          4.2. Usługodawca nie ponosi odpowiedzialności za szkody wynikające z podania przez Użytkownika nieprawdziwych
          lub niekompletnych danych.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Postanowienia Końcowe</h2>
        <p className="text-gray-700 mb-4">
          5.1. Wszelkie spory wynikające z niniejszego Regulaminu będą rozstrzygane przez sąd właściwy dla siedziby
          Usługodawcy.
        </p>
        <p className="text-gray-700 mb-8">5.2. Regulamin wchodzi w życie z dniem [Data].</p>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/">Powrót do strony głównej</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
