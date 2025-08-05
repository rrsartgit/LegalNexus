"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal API Nexus</h3>
            <p className="text-gray-400 text-sm">
              Profesjonalna platforma do zarządzania kancelariami prawnymi i świadczenia usług prawnych online.
            </p>
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Szybkie Linki</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jak-to-dziala" className="text-gray-400 hover:text-white transition-colors">
                  Jak to działa
                </Link>
              </li>
              <li>
                <Link href="/funkcje" className="text-gray-400 hover:text-white transition-colors">
                  Funkcje
                </Link>
              </li>
              <li>
                <Link href="/cennik" className="text-gray-400 hover:text-white transition-colors">
                  Cennik
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Usługi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/analiza-dokumentow" className="text-gray-400 hover:text-white transition-colors">
                  Analiza Dokumentów
                </Link>
              </li>
              <li>
                <Link href="/pisma-prawne" className="text-gray-400 hover:text-white transition-colors">
                  Pisma Prawne
                </Link>
              </li>
              <li>
                <Link href="/konsultacje" className="text-gray-400 hover:text-white transition-colors">
                  Konsultacje Online
                </Link>
              </li>
              <li>
                <Link href="/reprezentacja" className="text-gray-400 hover:text-white transition-colors">
                  Reprezentacja Prawna
                </Link>
              </li>
              <li>
                <Link href="/asystent-ai" className="text-gray-400 hover:text-white transition-colors">
                  Asystent AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informacje Prawne</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/regulamin" className="text-gray-400 hover:text-white transition-colors">
                  Regulamin
                </Link>
              </li>
              <li>
                <Link href="/polityka-prywatnosci" className="text-gray-400 hover:text-white transition-colors">
                  Polityka Prywatności
                </Link>
              </li>
              <li>
                <Link href="/rodo" className="text-gray-400 hover:text-white transition-colors">
                  RODO
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Legal API Nexus. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
