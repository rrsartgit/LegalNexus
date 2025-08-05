import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full py-8 md:py-12 border-t bg-background">
      <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <img src="/placeholder-logo.svg" alt="Legal API Nexus Logo" className="h-6 w-6" />
            Legal API Nexus
          </Link>
          <p className="text-sm text-muted-foreground">Profesjonalna pomoc prawna na wyciągnięcie ręki.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Usługi</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <Link href="/analiza-dokumentow" className="hover:underline">
                Analiza Dokumentów
              </Link>
            </li>
            <li>
              <Link href="/asystent-ai" className="hover:underline">
                Asystent AI
              </Link>
            </li>
            <li>
              <Link href="/reprezentacja" className="hover:underline">
                Reprezentacja Prawna
              </Link>
            </li>
            <li>
              <Link href="/pisma-prawne" className="hover:underline">
                Pisma Prawne
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Firma</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <Link href="/o-nas" className="hover:underline">
                O Nas
              </Link>
            </li>
            <li>
              <Link href="/funkcje" className="hover:underline">
                Funkcje
              </Link>
            </li>
            <li>
              <Link href="/jak-to-dziala" className="hover:underline">
                Jak to Działa
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:underline">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Zasoby</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/poradniki" className="hover:underline">
                Poradniki
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/dokumentacja-api" className="hover:underline">
                Dokumentacja API
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Legal API Nexus. Wszelkie prawa zastrzeżone.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/polityka-prywatnosci" className="hover:underline">
            Polityka Prywatności
          </Link>
          <Link href="/regulamin" className="hover:underline">
            Regulamin
          </Link>
          <Link href="/rodo" className="hover:underline">
            RODO
          </Link>
        </div>
      </div>
    </footer>
  )
}
