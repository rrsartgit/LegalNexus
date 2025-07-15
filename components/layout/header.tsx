"use client"

import { Button } from "@/components/ui/button"
import { Bell, LogOut, Menu, Scale, User } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth"

interface HeaderProps {
  /** Toggles the sidebar/drawer in mobile view */
  onMenuToggle?: () => void
  /** Whether to show the hamburger icon (mobile) */
  showMenuButton?: boolean
}

/**
 * Global top navigation bar.
 * Exports both a named and default component to satisfy existing imports.
 */
export function Header({ onMenuToggle, showMenuButton }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm font-montserrat">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand + optional burger */}
        <div className="flex items-center">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="mr-4 lg:hidden"
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

        {/* Desktop nav */}
        <nav className="hidden space-x-8 md:flex">
          <Link href="/" className="font-medium text-gray-700 transition-colors hover:text-blue-600">
            Strona główna
          </Link>
          <Link href="/jak-to-dziala" className="font-medium text-gray-700 transition-colors hover:text-blue-600">
            Jak to działa
          </Link>
          <Link href="/cennik" className="font-medium text-gray-700 transition-colors hover:text-blue-600">
            Cennik
          </Link>
          <Link href="/o-nas" className="font-medium text-gray-700 transition-colors hover:text-blue-600">
            O nas
          </Link>
          <Link href="/kontakt" className="font-medium text-gray-700 transition-colors hover:text-blue-600">
            Kontakt
          </Link>
        </nav>

        {/* Right-hand controls */}
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" aria-label="Powiadomienia">
                <Bell className="h-4 w-4" />
              </Button>

              {/* User menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-2"
                  aria-expanded={open}
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user?.name}</span>
                </Button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        href={user?.role === "client" ? "/panel-klienta" : "/panel-operatora"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mój panel
                      </Link>
                      <Link
                        href="/profil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
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

/* keep default export for any default-import usage */
export default Header
