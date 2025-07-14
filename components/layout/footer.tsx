"use client"

import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Scale className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold">
                Legal<span className="text-blue-400">Nexus</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Profesjonalna pomoc prawna online. Analiza dokumentów i przygotowanie pism prawnych przez doświadczonych
              prawników.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Usługi</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/analiza-dokumentow" className="hover:text-white transition-colors">
                  Analiza dokumentów
                </Link>
              </li>
              <li>
                <Link href="/pisma-prawne" className="hover:text-white transition-colors">
                  Pisma prawne
                </Link>
              </li>
              <li>
                <Link href="/konsultacje" className="hover:text-white transition-colors">
                  Konsultacje
                </Link>
              </li>
              <li>
                <Link href="/reprezentacja" className="hover:text-white transition-colors">
                  Reprezentacja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Informacje</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/regulamin" className="hover:text-white transition-colors">
                  Regulamin
                </Link>
              </li>
              <li>
                <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link href="/rodo" className="hover:text-white transition-colors">
                  RODO
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+48 123 456 789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>kontakt@legalnexus.pl</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Gdańsk, Polska</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2024 LegalNexus. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}
