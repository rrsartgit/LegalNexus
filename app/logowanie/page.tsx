"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth"
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react"

export default function LogowaniePage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [otpMode, setOtpMode] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [mfaCode, setMfaCode] = useState("")

  const {
    signInWithEmail,
    signInWithOAuth,
    signInWithOtpEmail,
    verifyOtpEmail,
    verifyMfaChallenge,
    loading,
    isAuthenticated,
  } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push("/panel-klienta")
  }, [isAuthenticated, router])

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await signInWithEmail(email, password)
    if (res.user) router.push("/panel-klienta")
  }
  async function handleOAuth(provider: "google" | "facebook") {
    await signInWithOAuth(provider)
  }
  async function startOtp() {
    if (!email) return
    const ok = await signInWithOtpEmail(email)
    if (ok) setOtpMode(true)
  }
  async function confirmOtp() {
    const res = await verifyOtpEmail(email, otpCode)
    if (res?.user) router.push("/panel-klienta")
  }
  async function confirmMfa() {
    if (!mfaCode) return
    // wymaga factorId, w tej wersji zakładamy standardowy sign-in bez wyzwania
    await verifyMfaChallenge("factor-id", mfaCode)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-md mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót
            </Link>
          </Button>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Zaloguj się</CardTitle>
              <p className="text-gray-600">Uzyskaj dostęp do panelu</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Button variant="outline" className="w-full bg-transparent" onClick={() => void handleOAuth("google")}>
                  Zaloguj przez Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => void handleOAuth("facebook")}
                >
                  Zaloguj przez Facebook
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">lub</span>
                </div>
              </div>

              {!otpMode ? (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="password">Hasło</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button type="button" variant="ghost" onClick={() => void startOtp()}>
                      Logowanie kodem OTP
                    </Button>
                    <Link href="/rejestracja" className="text-sm text-blue-600 hover:underline">
                      Rejestracja
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logowanie..." : "Zaloguj się"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label>Kod OTP</Label>
                    <Input
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Wpisz kod z e-maila"
                    />
                  </div>
                  <Button className="w-full" onClick={() => void confirmOtp()}>
                    Potwierdź kod
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setOtpMode(false)}>
                    Wróć
                  </Button>
                </div>
              )}

              <div className="mt-4 p-3 bg-blue-50 rounded text-xs flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                Po zalogowaniu włącz 2FA w sekcji “Bezpieczeństwo”.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
