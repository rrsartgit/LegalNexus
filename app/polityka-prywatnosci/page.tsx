"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PolitykaPrywatnosciPage() {
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

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Polityka Prywatności</h1>
        <p className="text-lg text-gray-700 mb-8">
          W LegalNexus z siedzibą w Gdańsku, szanujemy Twoją prywatność i zobowiązujemy się do ochrony Twoich danych
          osobowych. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy, wykorzystujemy i chronimy
          informacje, które nam przekazujesz.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Administrator Danych Osobowych</h2>
        <p className="text-gray-700 mb-8">
          Administratorem Twoich danych osobowych jest [Nazwa Firmy/Kancelarii], z siedzibą w Gdańsku, [Adres], NIP:
          [NIP], REGON: [REGON].
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Rodzaje Zbieranych Danych</h2>
        <p className="text-gray-700 mb-4">Zbieramy dane, które są niezbędne do świadczenia naszych usług, w tym:</p>
        <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
          <li>Dane identyfikacyjne (imię, nazwisko, nazwa firmy)</li>
          <li>Dane kontaktowe (adres e-mail, numer telefonu, adres korespondencyjny)</li>
          <li>Dane dotyczące płatności</li>
          <li>Dane zawarte w przesyłanych dokumentach prawnych</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cel i Podstawa Prawna Przetwarzania Danych</h2>
        <p className="text-gray-700 mb-4">Twoje dane osobowe są przetwarzane w celu:</p>
        <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
          <li>Świadczenia usług prawnych (podstawa prawna: wykonanie umowy)</li>
          <li>Realizacji obowiązków prawnych (np. podatkowych)</li>
          <li>Marketingu bezpośredniego (za Twoją zgodą)</li>
          <li>Ulepszania naszych usług i analizy statystycznej</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Odbiorcy Danych</h2>
        <p className="text-gray-700 mb-8">
          Twoje dane mogą być udostępniane podmiotom współpracującym z LegalNexus, takim jak dostawcy usług płatniczych,
          firmy hostingowe, wyłącznie w celu realizacji usług.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Twoje Prawa</h2>
        <p className="text-gray-700 mb-4">Masz prawo do:</p>
        <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
          <li>Dostępu do swoich danych</li>
          <li>Sprostowania danych</li>
          <li>Usunięcia danych ("prawo do bycia zapomnianym")</li>
          <li>Ograniczenia przetwarzania</li>
          <li>Przenoszenia danych</li>
          <li>Wniesienia sprzeciwu wobec przetwarzania</li>
          <li>Wycofania zgody na przetwarzanie danych</li>
          <li>Wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Zabezpieczenie Danych</h2>
        <p className="text-gray-700 mb-8">
          Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed nieuprawnionym
          dostępem, utratą, zniszczeniem lub ujawnieniem.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Pliki Cookies</h2>
        <p className="text-gray-700 mb-8">
          Nasza strona wykorzystuje pliki cookies w celu poprawy funkcjonalności i analizy ruchu na stronie.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Zmiany w Polityce Prywatności</h2>
        <p className="text-gray-700 mb-8">
          Niniejsza Polityka Prywatności może być aktualizowana. O wszelkich zmianach będziemy informować na naszej
          stronie internetowej.
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
