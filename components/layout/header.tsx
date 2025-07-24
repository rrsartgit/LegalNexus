"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface HeaderProps {
  onSectionChange: (section: string) => void
  activeSection: string
}

export function Header({ onSectionChange, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { id: "home", label: "Strona główna" },
    { id: "about", label: "O nas" },
    { id: "services", label: "Usługi" },
    { id: "blog", label: "Blog" },
    { id: "guides", label: "Poradniki" },
    { id: "contact", label: "Kontakt" },
    // Commented out for future use
    // { id: 'pricing', label: 'Cennik' },
    // { id: 'api-docs', label: 'Dokumentacja API' },
    // { id: 'law-firms', label: 'Kancelarie' },
  ]

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleSectionChange("home")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LAN</span>
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">Legal API Nexus</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/logowanie">
              <Button variant="ghost" size="sm" className="font-medium">
                Zaloguj się
              </Button>
            </Link>
            <Link href="/rejestracja">
              <Button size="sm" className="font-medium">
                Zarejestruj się
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Otwórz menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="font-bold text-lg">Menu</span>
                </div>

                <nav className="flex flex-col space-y-2 mt-6 flex-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSectionChange(item.id)}
                      className={`text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="border-t pt-4 space-y-2">
                  <Link href="/logowanie" className="block">
                    <Button variant="ghost" className="w-full justify-start font-medium">
                      Zaloguj się
                    </Button>
                  </Link>
                  <Link href="/rejestracja" className="block">
                    <Button className="w-full justify-start font-medium">Zarejestruj się</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
