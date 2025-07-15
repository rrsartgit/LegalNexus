"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, FileEdit, Gavel, ScrollText } from "lucide-react"

export default function PismaPrawnePage() {
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

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Przygotowanie Pism Prawnych</h1>
        <p className="text-lg text-gray-700 mb-8">
          Potrzebujesz profesjonalnie przygotowanego pisma prawnego? W LegalNexus tworzymy pisma dostosowane do Twojej
          indywidualnej sytuacji, zapewniając ich zgodność z obowiązującymi przepisami i najwyższą skuteczność.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FileEdit className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Indywidualne Podejście</h2>
            <p className="text-gray-600">
              Każde pismo jest tworzone od podstaw, z uwzględnieniem specyfiki Twojej sprawy i Twoich celów.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Gavel className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Zgodność z Prawem</h2>
            <p className="text-gray-600">
              Gwarantujemy, że wszystkie pisma są zgodne z aktualnym stanem prawnym i wymogami formalnymi.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ScrollText className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Szeroki Zakres</h2>
            <p className="text-gray-600">
              Przygotowujemy m.in. sprzeciwy, odwołania, pozwy, wnioski, pisma procesowe i wiele innych.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">Jak zamówić pismo?</h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-3 mb-12">
          <li>Skorzystaj z naszej usługi analizy dokumentów, aby uzyskać pełne zrozumienie swojej sytuacji.</li>
          <li>Na podstawie analizy, wybierz rodzaj pisma, którego potrzebujesz.</li>
          <li>Udziel nam wszelkich niezbędnych informacji i dokumentów.</li>
          <li>Nasi prawnicy przygotują pismo i prześlą je do Ciebie w ciągu 48 godzin.</li>
          <li>Otrzymasz gotowe pismo, które możesz złożyć w odpowiedniej instytucji.</li>
        </ol>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/zamow-analize">Zamów Pismo Prawne</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
