"use client"

import { Button } from "@/components/ui/button"
import { Scale, User, LogOut, Menu, Bell } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useState } from "react"
import Link from "next/link"

interface HeaderProps {
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export function Header({ onMenuToggle, showMenuButton }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showMenuButton && (
              <Button variant="ghost" size="sm" onClick={onMenuToggle} className="mr-4 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            )}

            <Link href="/" className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">
                Legal<span className="text-blue-600">Nexus</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Strona główna
            </Link>
            <Link href="/jak-to-dziala" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Jak to działa
            </Link>
            <Link href="/cennik" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Cennik
            </Link>
            <Link href="/o-nas" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              O nas
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Kontakt
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user?.name}</span>
                  </Button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
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
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4 inline mr-2" />
                          Wyloguj
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/logowanie">Logowanie</Link>
                </Button>
                <Button asChild>
                  <Link href="/rejestracja">Rejestracja</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
