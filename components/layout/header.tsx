"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
  DollarSign,
  BookOpen,
  Lightbulb,
  Users,
  Briefcase,
  Shield,
  BarChart,
  Gavel,
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
import { usePathname } from "next/navigation"

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void
  showMenuButton?: boolean
}

export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
  const { user, isAuthenticated, role } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Strona Główna", href: "/", icon: Home },
    { name: "Jak to działa", href: "/jak-to-dziala", icon: Lightbulb },
    { name: "Funkcje", href: "/funkcje", icon: BarChart },
    { name: "Cennik", href: "/cennik", icon: DollarSign },
    { name: "Kancelarie", href: "/kancelarie", icon: Briefcase },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Poradniki", href: "/poradniki", icon: BookOpen },
    { name: "Dokumentacja API", href: "/dokumentacja-api", icon: FileText },
    { name: "O nas", href: "/o-nas", icon: Users },
    { name: "Kontakt", href: "/kontakt", icon: Phone },
  ]

  const servicesDropdown = [
    { name: "Analiza dokumentów", href: "/analiza-dokumentow", icon: FileText },
    { name: "Pisma prawne", href: "/pisma-prawne", icon: Scale },
    { name: "Konsultacje", href: "/konsultacje", icon: Phone },
    { name: "Reprezentacja", href: "/reprezentacja", icon: Gavel },
  ]

  const informationDropdown = [
    { name: "Regulamin", href: "/regulamin", icon: BookOpen },
    { name: "Polityka prywatności", href: "/polityka-prywatnosci", icon: Shield },
    { name: "RODO", href: "/rodo", icon: Shield },
    { name: "FAQ", href: "/faq", icon: Info },
  ]

  const getPanelLink = () => {
    if (role === "admin") {
      return "/admin"
    } else if (role === "client") {
      return "/panel-klienta"
    } else if (role === "operator") {
      return "/panel-operatora"
    }
    return null
  }

  const panelLink = getPanelLink()

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-700">
          <Scale className="h-6 w-6" />
          LegalNexus
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === item.href ? "text-blue-700" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                Usługi
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {servicesDropdown.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
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
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
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
                {panelLink && (
                  <DropdownMenuItem asChild>
                    <Link href={panelLink} className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Mój Panel ({role === "admin" ? "Admin" : role === "client" ? "Klient" : "Operator"})
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={mockLogout} className="flex items-center cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Wyloguj
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/logowanie">
                  <LogIn className="mr-2 h-4 w-4" />
                  Logowanie
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/rejestracja">
                  <User className="mr-2 h-4 w-4" />
                  Rejestracja
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Navigation Toggle */}
          {showMenuButton && (
            <Sheet onOpenChange={onMenuToggle}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                <div className="flex flex-col gap-4 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-blue-600"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Usługi</h3>
                    {servicesDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 text-base py-2 text-gray-700 hover:text-blue-600"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Informacje</h3>
                    {informationDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 text-base py-2 text-gray-700 hover:text-blue-600"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
