"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/frontend/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithEmail } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    const { user, error: authError } = await signInWithEmail(email, password)
    setIsLoading(false)

    if (authError) {
      setError(authError)
    } else if (user) {
      // Redirect based on user role
      if (user.role === "ADMIN") {
        router.push("/admin")
      } else if (user.role === "OPERATOR") {
        router.push("/panel-operatora")
      } else if (user.role === "CLIENT") {
        router.push("/panel-klienta")
      } else {
        router.push("/dashboard") // Default fallback
      }
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Logowanie</CardTitle>
        <CardDescription>Wprowadź swój email poniżej, aby zalogować się do swojego konta</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Hasło</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Zapomniałeś hasła?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logowanie...
              </>
            ) : (
              "Zaloguj się"
            )}
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Zaloguj się z Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Nie masz konta?{" "}
          <Link href="/rejestracja" className="underline">
            Zarejestruj się
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
