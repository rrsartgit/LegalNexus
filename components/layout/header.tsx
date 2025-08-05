"use client"
import { Button } from "@/components/ui/button"
import { Scale, Menu, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"
import Link from "next/link"
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
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
  const { user, isAuthenticated, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    window.location.href = "/"
  }

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

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showMenuButton && (
              <Button variant="ghost" size="sm" onClick={onMenuToggle} className="mr-4 lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            )}

            <Link href="/" className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">
                LegalAPI<span className="text-blue-600">Nexus</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
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
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {user.role === "client" ? "Klient" : user.role === "operator" ? "Operator" : "Administrator"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getUserPanelLink()}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mój panel</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Wyloguj</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link href="/logowanie">
                  <Button variant="outline">Zaloguj się</Button>
                </Link>
                <Link href="/rejestracja">
                  <Button>Zarejestruj się</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
