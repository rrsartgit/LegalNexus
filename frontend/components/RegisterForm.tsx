"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { toast } from "@/components/ui/use-toast"

interface RegisterFormProps {
  onSuccess: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { register, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const result = await register(email, password)
    if (result.success) {
      toast({
        title: "Rejestracja zakończona sukcesem!",
        description: "Twoje konto zostało utworzone. Możesz się teraz zalogować.",
      })
      onSuccess()
    } else {
      setError(result.error || "Wystąpił błąd podczas rejestracji.")
      toast({
        title: "Błąd rejestracji",
        description: result.error || "Spróbuj ponownie z innym adresem email.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password">Hasło</Label>
        <Input
          id="register-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Rejestracja..." : "Zarejestruj się"}
      </Button>
    </form>
  )
}
