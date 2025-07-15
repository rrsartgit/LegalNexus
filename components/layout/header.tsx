"use client"

import { Button } from "@/components/ui/button"
import { Bell, LogOut, Menu, Scale, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth"

interface HeaderProps {
  /** Toggle callback for the sidebar in mobile view */
  onMenuToggle?: () => void
  /** Show the burger icon (mobile) */
  showMenuButton?: boolean
}

/**
 * Global top-navigation bar.
 *
 * - Exports a **named** `Header` for existing `import { Header } …` calls.
 * - Also exports **default** so `import Header from …` stays valid.
 */
function Header({ onMenuToggle, showMenuButton }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm font-montserrat">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* brand + optional burger */}
        <div className="flex items-center">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="sm"
              className="mr-4 lg:hidden"
              onClick={onMenuToggle}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <Link href="/" className="flex items-center">
            <Scale className="mr-2 h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Legal<span className="text-blue-600">Nexus</span>
            </span>
          </Link>
        </div>

        {/* desktop navigation */}
        <nav className="hidden space-x-8 md:flex">
          {[
            { href: "/", label: "Strona główna" },
            { href: "/jak-to-dziala", label: "Jak to działa" },
            { href: "/cennik", label: "Cennik" },
            { href: "/o-nas", label: "O nas" },
            { href: "/kontakt", label: "Kontakt" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* right-hand controls */}
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" aria-label="Powiadomienia">
                <Bell className="h-4 w-4" />
              </Button>

              {/* user dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center space-x-2"
                  aria-expanded={menuOpen}
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user?.name}</span>
                </Button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        href={user?.role === "client" ? "/panel-klienta" : "/panel-operatora"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mój panel
                      </Link>
                      <Link href="/profil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profil
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-2 inline h-4 w-4" />
                        Wyloguj
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/logowanie">Logowanie</Link>
              </Button>
              <Button asChild>
                <Link href="/rejestracja">Rejestracja</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export { Header }
export default Header
