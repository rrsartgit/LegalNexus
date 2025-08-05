"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Scale, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
  onSectionChange: (section: string) => void
  activeSection: string
}

export function Header({ onSectionChange, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, signOut } = useAuth()

  const navigationItems = [
    { name: "Strona główna", href: "home" },
    { name: "Jak to działa", href: "jak-to-dziala" },
    { name: "Funkcje", href: "funkcje" },
    { name: "Blog", href: "blog" },
    { name: "Poradniki", href: "poradniki" },
    { name: "O nas", href: "o-nas" },
    { name: "Kontakt", href: "kontakt" },
  ]

  const servicesItems = [
    { name: "Analiza dokumentów", href: "analiza-dokumentow" },
    { name: "Pisma prawne", href: "pisma-prawne" },
    { name: "Konsultacje", href: "konsultacje" },
    { name: "Reprezentacja", href: "reprezentacja" },
  ]

  const legalItems = [
    { name: "Regulamin", href: "regulamin" },
    { name: "Polityka prywatności", href: "polityka-prywatnosci" },
    { name: "RODO", href: "rodo" },
    { name: "FAQ", href: "faq" },
  ]

  const handleNavClick = (section: string) => {
    onSectionChange(section)
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await signOut()
    onSectionChange("home")
  }

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  const getUserPanelLink = () => {
    if (!user) return "/dashboard"

    switch (user.role) {
      case "admin":
        return "/admin"
      case "operator":
        return "/panel-operatora"
      default:
        return "/panel-klienta"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Legal Nexus</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                        activeSection === item.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </button>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Usługi</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {servicesItems.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-left"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Informacje</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[300px] gap-3 p-4">
                      {legalItems.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-left"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - Theme toggle and Auth */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getUserInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.email}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.role === "admin" ? "Administrator" : user.role === "operator" ? "Operator" : "Klient"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getUserPanelLink()}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Panel użytkownika</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Wyloguj się</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" onClick={() => handleNavClick("logowanie")} className="text-sm font-medium">
                  Zaloguj się
                </Button>
                <Button onClick={() => handleNavClick("rejestracja")} className="text-sm font-medium">
                  Zarejestruj się
                </Button>
              </div>
            )}

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`text-left px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                          activeSection === item.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Usługi</p>
                      {servicesItems.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className="block text-left px-3 py-2 text-sm transition-colors hover:text-primary"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Informacje</p>
                      {legalItems.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className="block text-left px-3 py-2 text-sm transition-colors hover:text-primary"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>

                    {!isAuthenticated && (
                      <div className="border-t pt-4 space-y-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleNavClick("logowanie")}
                          className="w-full justify-start"
                        >
                          Zaloguj się
                        </Button>
                        <Button onClick={() => handleNavClick("rejestracja")} className="w-full justify-start">
                          Zarejestruj się
                        </Button>
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
