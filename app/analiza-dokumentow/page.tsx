"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, FileText, Lightbulb, ShieldCheck } from "lucide-react"

export default function AnalizaDokumentowPage() {
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

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Analiza Dokumentów Prawnych</h1>
        <p className="text-lg text-gray-700 mb-8">
          W LegalNexus oferujemy profesjonalną i szybką analizę wszelkich dokumentów prawnych, które otrzymałeś.
          Niezależnie od tego, czy jest to nakaz zapłaty, wezwanie do sądu, czy inna korespondencja prawna, nasi
          doświadczeni prawnicy są gotowi, aby Ci pomóc.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FileText className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Kompleksowa Ocena</h2>
            <p className="text-gray-600">
              Dokładnie analizujemy treść dokumentu, identyfikując kluczowe terminy, zagrożenia i możliwości działania.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Lightbulb className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Jasne Wskazówki</h2>
            <p className="text-gray-600">
              Otrzymasz zrozumiałe wyjaśnienie sytuacji prawnej oraz konkretne rekomendacje dotyczące dalszych kroków.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ShieldCheck className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Poufność i Bezpieczeństwo</h2>
            <p className="text-gray-600">
              Gwarantujemy pełną poufność Twoich danych i dokumentów zgodnie z najwyższymi standardami etyki prawniczej.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">Jak to działa?</h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-3 mb-12">
          <li>Prześlij skan lub zdjęcie dokumentu za pośrednictwem naszego bezpiecznego formularza.</li>
          <li>Opisz krótko swoją sytuację i czego oczekujesz od analizy.</li>
          <li>Dokonaj płatności za usługę.</li>
          <li>W ciągu 24 godzin otrzymasz szczegółową analizę prawną na swój adres e-mail.</li>
          <li>Na podstawie analizy możesz zamówić przygotowanie odpowiednich pism prawnych.</li>
        </ol>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/zamow-analize">Zamów Analizę Dokumentu</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
