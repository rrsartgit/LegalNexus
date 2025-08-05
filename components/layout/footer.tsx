"use client"

import Link from "next/link"
import { Scale } from "lucide-react"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2 font-bold text-lg">
            <Scale className="h-6 w-6 text-primary" />
            Legal Nexus
          </Link>
          <p className="text-sm text-muted-foreground">Profesjonalna pomoc prawna online.</p>
          <div className="flex gap-4">
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
        <div className="grid gap-2">
          <h3 className="font-semibold text-lg">Usługi</h3>
          <Link href="/analiza-dokumentow" className="text-sm text-muted-foreground hover:underline">
            Analiza dokumentów
          </Link>
          <Link href="/pisma-prawne" className="text-sm text-muted-foreground hover:underline">
            Pisma prawne
          </Link>
          <Link href="/konsultacje" className="text-sm text-muted-foreground hover:underline">
            Konsultacje
          </Link>
          <Link href="/reprezentacja" className="text-sm text-muted-foreground hover:underline">
            Reprezentacja
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold text-lg">Informacje</h3>
          <Link href="/regulamin" className="text-sm text-muted-foreground hover:underline">
            Regulamin
          </Link>
          <Link href="/polityka-prywatnosci" className="text-sm text-muted-foreground hover:underline">
            Polityka prywatności
          </Link>
          <Link href="/rodo" className="text-sm text-muted-foreground hover:underline">
            RODO
          </Link>
          <Link href="/faq" className="text-sm text-muted-foreground hover:underline">
            FAQ
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold text-lg">Kontakt</h3>
          <p className="text-sm text-muted-foreground">Email: kontakt@legalnexus.pl</p>
          <p className="text-sm text-muted-foreground">Telefon: +48 123 456 789</p>
          <p className="text-sm text-muted-foreground">Adres: ul. Prawnicza 1, 00-001 Warszawa</p>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Legal API Nexus. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  )
}
