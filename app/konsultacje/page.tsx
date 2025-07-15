"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MessageSquare, Calendar, Users } from "lucide-react"

export default function KonsultacjePage() {
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

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Konsultacje Prawne Online</h1>
        <p className="text-lg text-gray-700 mb-8">
          Potrzebujesz porady prawnej, ale brakuje Ci czasu na wizytę w kancelarii? Skorzystaj z naszych konsultacji
          prawnych online. Nasi prawnicy są dostępni, aby odpowiedzieć na Twoje pytania i rozwiać wątpliwości,
          zapewniając wygodę i elastyczność.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MessageSquare className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Wygodna Forma</h2>
            <p className="text-gray-600">
              Konsultacje odbywają się online, co pozwala na uzyskanie porady z dowolnego miejsca i o dowolnej porze.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Calendar className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Elastyczny Grafik</h2>
            <p className="text-gray-600">
              Dopasuj termin konsultacji do swojego harmonogramu, wybierając dogodną datę i godzinę.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Doświadczeni Prawnicy</h2>
            <p className="text-gray-600">
              Porady udzielane są przez wykwalifikowanych prawników z wieloletnim doświadczeniem.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">Jak umówić konsultację?</h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-3 mb-12">
          <li>Wybierz preferowany termin konsultacji z dostępnego kalendarza.</li>
          <li>Opisz krótko temat, który chcesz omówić podczas konsultacji.</li>
          <li>Dokonaj płatności za usługę.</li>
          <li>Otrzymasz potwierdzenie rezerwacji i link do spotkania online.</li>
          <li>W wybranym terminie połącz się z prawnikiem i uzyskaj profesjonalną poradę.</li>
        </ol>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/zamow-analize">Umów Konsultację</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
