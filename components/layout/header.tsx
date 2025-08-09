"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth"
import { Menu, Home, FileText, BookOpen, Shield, Info, LogIn, LogOut, User, Scale } from "lucide-react"

export function Header() {
  const { user, isAuthenticated, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { name: "Strona Główna", href: "/", icon: Home },
    { name: "Asystent AI", href: "/asystent-ai", icon: FileText },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Poradniki", href: "/poradniki", icon: BookOpen },
    // Kontakt został usunięty na Twoje życzenie
  ]

  const informationDropdown = [
    { name: "Regulamin", href: "/regulamin", icon: BookOpen },
    { name: "Polityka prywatności", href: "/polityka-prywatnosci", icon: Shield },
    { name: "RODO", href: "/rodo", icon: Shield },
    { name: "FAQ", href: "/faq", icon: Info },
  ]

  const getUserPanelLink = () => {
    if (!user) return "/panel-klienta"
    if (user.role === "admin") return "/admin"
    if (user.role === "operator") return "/panel-operatora"
    return "/panel-klienta"
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = "/"
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm transition-all ${isScrolled ? "shadow" : ""}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Scale className="h-6 w-6 text-blue-600" />
          <span>Kancelaria X</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Informacje</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Dokumenty</DropdownMenuLabel>
              {informationDropdown.map((it) => (
                <DropdownMenuItem key={it.href} asChild>
                  <Link href={it.href} className="flex items-center gap-2">
                    <it.icon className="h-4 w-4" />
                    {it.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name?.slice(0, 2)?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="max-w-[220px]">
                  <div className="truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.email}</div>
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
            <div className="hidden sm:flex gap-2">
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

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => (
                  <Button key={item.href} variant="ghost" asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ))}
                {!isAuthenticated ? (
                  <>
                    <Button variant="outline" asChild>
                      <Link href="/logowanie">Logowanie</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/rejestracja">Rejestracja</Link>
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={handleLogout}>
                    Wyloguj
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
