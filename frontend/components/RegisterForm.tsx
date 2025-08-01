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

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signUpWithEmail } = useAuth()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Hasła nie są zgodne.")
      return
    }

    setIsLoading(true)
    const { user, error: authError } = await signUpWithEmail(email, password)
    setIsLoading(false)

    if (authError) {
      setError(authError)
    } else if (user) {
      // After successful registration, redirect to login or a success page
      router.push("/logowanie?registered=true")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Rejestracja</CardTitle>
        <CardDescription>Wprowadź swoje dane, aby utworzyć konto</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="grid gap-4">
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
            <Label htmlFor="password">Hasło</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Potwierdź Hasło</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rejestracja...
              </>
            ) : (
              "Utwórz konto"
            )}
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Zarejestruj się z Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Masz już konto?{" "}
          <Link href="/logowanie" className="underline">
            Zaloguj się
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
