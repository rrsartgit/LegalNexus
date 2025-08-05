"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, LogIn, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
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
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push("/logowanie")
  }

  const navItems = [
    { name: "Home", section: "home" },
    { name: "Jak to działa", section: "jak-to-dziala" },
    { name: "Funkcje", section: "funkcje" },
    { name: "O nas", section: "o-nas" },
    { name: "Kontakt", section: "kontakt" },
    { name: "Analiza Dokumentów", section: "analiza-dokumentow" },
    { name: "Pisma Prawne", section: "pisma-prawne" },
    { name: "Konsultacje", section: "konsultacje" },
    { name: "Reprezentacja", section: "reprezentacja" },
    { name: "Regulamin", section: "regulamin" },
    { name: "Polityka Prywatności", section: "polityka-prywatnosci" },
    { name: "RODO", section: "rodo" },
    { name: "FAQ", section: "faq" },
    { name: "Asystent AI", section: "asystent-ai" },
    { name: "Blog", section: "blog" },
    { name: "Poradniki", section: "poradniki" },
    { name: "Zamów Analizę", section: "zamow-analize" },
  ]

  const getDashboardPath = (role: string | undefined) => {
    switch (role) {
      case "admin":
        return "/admin"
      case "operator":
        return "/panel-operatora"
      case "client":
        return "/panel-klienta"
      default:
        return "/dashboard" // Fallback or generic dashboard
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" onClick={() => onSectionChange("home")}>
          <img src="/placeholder-logo.svg" alt="Legal API Nexus Logo" className="h-8 w-auto" />
          <span className="font-bold text-lg">Legal API Nexus</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.slice(0, 5).map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              onClick={() => onSectionChange(item.section)}
              className={activeSection === item.section ? "font-semibold text-primary" : ""}
            >
              {item.name}
            </Button>
          ))}
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url || "/placeholder-user.jpg"} alt={user.email || "User"} />
                    <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getDashboardPath(user.role)}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Wyloguj
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/logowanie">
                <LogIn className="mr-2 h-4 w-4" />
                Logowanie
              </Link>
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 py-6">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onSectionChange(item.section)
                    setIsSheetOpen(false)
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <div className="mt-4 border-t pt-4 flex flex-col gap-4">
                <ModeToggle />
                {user ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href={getDashboardPath(user.role)}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Wyloguj
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/logowanie">
                      <LogIn className="mr-2 h-4 w-4" />
                      Logowanie
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
