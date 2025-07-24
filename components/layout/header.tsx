"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  User,
  LogIn,
  LogOut,
  FileText,
  Scale,
  Phone,
  Info,
  Home,
  Lightbulb,
  Users,
  Shield,
  BarChart,
  Gavel,
  BookOpen,
} from "lucide-react"
import { useAuth, mockLogout } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  onSectionChange: (section: string) => void
  activeSection: string
}

export function Header({ onSectionChange, activeSection }: HeaderProps) {
  const { user, isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: "Strona Główna", section: "home", icon: Home },
    { name: "Jak to działa", section: "jak-to-dziala", icon: Lightbulb },
    { name: "Funkcje", section: "funkcje", icon: BarChart },
    // { name: "Cennik", section: "cennik", icon: DollarSign }, // Commented out as requested
    // { name: "Kancelarie", section: "kancelarie", icon: Briefcase }, // Commented out as requested
    { name: "Blog", section: "blog", icon: BookOpen },
    { name: "Poradniki", section: "poradniki", icon: BookOpen },
    // { name: "Dokumentacja API", section: "dokumentacja-api", icon: FileText }, // Commented out as requested
    { name: "O nas", section: "o-nas", icon: Users },
    { name: "Kontakt", section: "kontakt", icon: Phone },
  ]

  const servicesDropdown = [
    { name: "Analiza dokumentów", section: "analiza-dokumentow", icon: FileText },
    { name: "Pisma prawne", section: "pisma-prawne", icon: Scale },
    { name: "Konsultacje", section: "konsultacje", icon: Phone },
    { name: "Reprezentacja", section: "reprezentacja", icon: Gavel },
  ]

  const informationDropdown = [
    { name: "Regulamin", section: "regulamin", icon: BookOpen },
    { name: "Polityka prywatności", section: "polityka-prywatnosci", icon: Shield },
    { name: "RODO", section: "rodo", icon: Shield },
    { name: "FAQ", section: "faq", icon: Info },
  ]

  const handleLogout = () => {
    mockLogout()
    onSectionChange("home") // Redirect to home page after logout
  }

  const getPanelSection = () => {
    if (user?.role === "admin") {
      return "admin"
    } else if (user?.role === "client") {
      return "panel-klienta"
    } else if (user?.role === "operator") {
      return "panel-operatora"
    }
    return null
  }

  const panelSection = getPanelSection()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm transition-all duration-300 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <button
          onClick={() => onSectionChange("home")}
          className="flex items-center gap-2 font-bold text-lg text-blue-700 hover:text-blue-800 transition-colors"
        >
          <Scale className="h-6 w-6" />
          LegalNexus
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onSectionChange(item.section)}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                activeSection === item.section ? "text-blue-700" : "text-gray-600"
              }`}
            >
              {item.name}
            </button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                Usługi
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {servicesDropdown.map((item) => (
                <DropdownMenuItem key={item.name} onClick={() => onSectionChange(item.section)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                Informacje
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {informationDropdown.map((item) => (
                <DropdownMenuItem key={item.name} onClick={() => onSectionChange(item.section)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Auth/User Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {panelSection && (
                  <DropdownMenuItem onClick={() => onSectionChange(panelSection)}>
                    <User className="mr-2 h-4 w-4" />
                    Mój Panel ({user?.role === "admin" ? "Admin" : user?.role === "client" ? "Klient" : "Operator"})
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Wyloguj
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onSectionChange("logowanie")}>
                <LogIn className="mr-2 h-4 w-4" />
                Logowanie
              </Button>
              <Button size="sm" onClick={() => onSectionChange("rejestracja")}>
                <User className="mr-2 h-4 w-4" />
                Rejestracja
              </Button>
            </div>
          )}

          {/* Mobile Navigation Toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
              <div className="flex flex-col gap-4 p-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => onSectionChange(item.section)}
                    className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-blue-600 text-left"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </button>
                ))}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Usługi</h3>
                  {servicesDropdown.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => onSectionChange(item.section)}
                      className="flex items-center gap-3 text-base py-2 text-gray-700 hover:text-blue-600 text-left w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Informacje</h3>
                  {informationDropdown.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => onSectionChange(item.section)}
                      className="flex items-center gap-3 text-base py-2 text-gray-700 hover:text-blue-600 text-left w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
