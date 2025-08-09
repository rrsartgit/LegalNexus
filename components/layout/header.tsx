"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, LogIn, LogOut, Scale } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void
  showMenuButton?: boolean
  onNavigate?: (section: string) => void
  currentSection?: string
}

const nav = [
  { href: "/o-nas", label: "O nas" },
  { href: "/funkcje", label: "Funkcje" },
  { href: "/cennik", label: "Cennik" },
  { href: "/blog", label: "Blog" },
  { href: "/asystent-ai", label: "Asystent AI" },
  { href: "/panel-klienta", label: "Panel klienta" },
  { href: "/panel-operatora", label: "Panel operatora" },
  { href: "/admin", label: "Admin" },
]

export function Header({ onMenuToggle, showMenuButton = false, onNavigate, currentSection }: HeaderProps) {
  const { user, isAuthenticated, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const getUserPanelLink = () => {
    if (!user) return "/panel-klienta"
    switch (user.role) {
      case "admin":
        return "/admin"
      case "operator":
        return "/panel-operatora"
      default:
        return "/panel-klienta"
    }
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = "/"
  }

  const handleNavClick = (item: any) => {
    if (item.href) window.location.href = item.href
    else if (onNavigate) onNavigate(item.key)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm transition-all border-b ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Scale className="h-6 w-6" />
          <span className="text-xl">Kancelaria X</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "text-foreground font-medium",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getUserPanelLink()}>Mój panel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ustawienia-bezpieczenstwa">Bezpieczeństwo</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Wyloguj
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/logowanie">
                  <LogIn className="mr-2 h-4 w-4" /> Logowanie
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/rejestracja">
                  <User className="mr-2 h-4 w-4" /> Rejestracja
                </Link>
              </Button>
            </div>
          )}

          {showMenuButton && (
            <Sheet onOpenChange={onMenuToggle}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                <div className="flex flex-col gap-4 p-4">
                  {nav.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      onClick={() => handleNavClick(item)}
                      className="justify-start"
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
