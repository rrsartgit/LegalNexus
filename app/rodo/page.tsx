"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RodoPage() {
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

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Informacje o RODO</h1>
        <p className="text-lg text-gray-700 mb-8">
          W LegalNexus z siedzibą w Gdańsku, w pełni przestrzegamy przepisów Rozporządzenia Parlamentu Europejskiego i
          Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem
          danych osobowych i w sprawie swobodnego przepływu takich danych (RODO). Poniżej przedstawiamy kluczowe
          informacje dotyczące przetwarzania Twoich danych osobowych.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Administrator Danych Osobowych</h2>
        <p className="text-gray-700 mb-8">
          Administratorem Twoich danych osobowych jest [Nazwa Firmy/Kancelarii], z siedzibą w Gdańsku, [Adres], NIP:
          [NIP], REGON: [REGON].
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cele i Podstawy Prawne Przetwarzania</h2>
        <p className="text-gray-700 mb-4">
          Twoje dane osobowe są przetwarzane w następujących celach i na następujących podstawach prawnych:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
          <li>
            **Świadczenie usług prawnych** (art. 6 ust. 1 lit. b RODO) – przetwarzanie jest niezbędne do wykonania
            umowy, której jesteś stroną.
          </li>
          <li>
            **Wypełnienie obowiązków prawnych** (art. 6 ust. 1 lit. c RODO) – np. obowiązków podatkowych i rachunkowych.
          </li>
          <li>
            **Ustalenie, dochodzenie lub obrona roszczeń** (art. 6 ust. 1 lit. f RODO) – prawnie uzasadniony interes
            administratora.
          </li>
          <li>
            **Marketing bezpośredni** (art. 6 ust. 1 lit. a lub f RODO) – na podstawie Twojej zgody lub prawnie
            uzasadnionego interesu administratora.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Okres Przechowywania Danych</h2>
        <p className="text-gray-700 mb-8">
          Twoje dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane,
          a także przez okres wynikający z przepisów prawa (np. okres przedawnienia roszczeń, obowiązki podatkowe).
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Twoje Prawa wynikające z RODO</h2>
        <p className="text-gray-700 mb-4">Zgodnie z RODO, przysługują Ci następujące prawa:</p>
        <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
          <li>**Prawo dostępu do danych** (art. 15 RODO)</li>
          <li>**Prawo do sprostowania danych** (art. 16 RODO)</li>
          <li>**Prawo do usunięcia danych** ("prawo do bycia zapomnianym") (art. 17 RODO)</li>
          <li>**Prawo do ograniczenia przetwarzania** (art. 18 RODO)</li>
          <li>**Prawo do przenoszenia danych** (art. 20 RODO)</li>
          <li>**Prawo do wniesienia sprzeciwu** (art. 21 RODO)</li>
          <li>**Prawo do wycofania zgody** w dowolnym momencie (jeśli przetwarzanie odbywa się na podstawie zgody)</li>
          <li>**Prawo wniesienia skargi do organu nadzorczego** (Prezesa Urzędu Ochrony Danych Osobowych)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Bezpieczeństwo Danych</h2>
        <p className="text-gray-700 mb-8">
          Stosujemy odpowiednie środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo Twoich danych osobowych,
          w tym szyfrowanie, kontrolę dostępu i regularne kopie zapasowe.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Kontakt w Sprawie Danych Osobowych</h2>
        <p className="text-gray-700 mb-8">
          Wszelkie pytania dotyczące przetwarzania danych osobowych oraz korzystania z przysługujących Ci praw prosimy
          kierować na adres e-mail: kontakt@legalnexus.pl lub pisemnie na adres siedziby administratora.
        </p>

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
