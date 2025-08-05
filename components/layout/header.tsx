"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { LoginForm } from "@/frontend/components/LoginForm"
import { RegisterForm } from "@/frontend/components/RegisterForm"

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
    setIsRegisterModalOpen(false)
  }

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true)
    setIsLoginModalOpen(false)
  }

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false)
    if (user?.role === "admin") {
      router.push("/admin")
    } else if (user?.role === "operator") {
      router.push("/panel-operatora")
    } else {
      router.push("/panel-klienta")
    }
  }

  const handleRegisterSuccess = () => {
    setIsRegisterModalOpen(false)
    router.push("/panel-klienta") // Default redirect for new users
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navigationItems = [
    { name: "Funkcje", href: "/funkcje" },
    { name: "Jak to działa", href: "/jak-to-dziala" },
    { name: "Cennik", href: "/cennik" },
    { name: "Kancelarie", href: "/kancelarie" },
    { name: "Kontakt", href: "/kontakt" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/placeholder-logo.svg" alt="Legal API Nexus Logo" className="h-6 w-6" />
          Legal API Nexus
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium hover:underline underline-offset-4">
              {item.name}
            </Link>
          ))}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <img src="/placeholder-user.jpg" alt="User Avatar" className="h-8 w-8 rounded-full object-cover" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <Link
                    href={
                      user.role === "admin"
                        ? "/admin"
                        : user.role === "operator"
                          ? "/panel-operatora"
                          : "/panel-klienta"
                    }
                  >
                    Panel {user.role === "admin" ? "Admina" : user.role === "operator" ? "Operatora" : "Klienta"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Wyloguj</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={handleLoginClick}>
                Zaloguj
              </Button>
              <Button onClick={handleRegisterClick}>Zarejestruj</Button>
            </>
          )}
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navigationItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        user.role === "admin"
                          ? "/admin"
                          : user.role === "operator"
                            ? "/panel-operatora"
                            : "/panel-klienta"
                      }
                    >
                      Panel {user.role === "admin" ? "Admina" : user.role === "operator" ? "Operatora" : "Klienta"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Wyloguj</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={handleLoginClick}>Zaloguj</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleRegisterClick}>Zarejestruj</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Zaloguj się</DialogTitle>
            <DialogDescription>Wprowadź swoje dane, aby uzyskać dostęp do konta.</DialogDescription>
          </DialogHeader>
          <LoginForm onSuccess={handleLoginSuccess} />
          <Button variant="link" onClick={handleRegisterClick}>
            Nie masz konta? Zarejestruj się
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Zarejestruj się</DialogTitle>
            <DialogDescription>Utwórz nowe konto, aby korzystać z naszych usług.</DialogDescription>
          </DialogHeader>
          <RegisterForm onSuccess={handleRegisterSuccess} />
          <Button variant="link" onClick={handleLoginClick}>
            Masz już konto? Zaloguj się
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  )
}
