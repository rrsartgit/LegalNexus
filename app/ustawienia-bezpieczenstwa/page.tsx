"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { toast } from "@/components/ui/use-toast"

export default function SecuritySettingsPage() {
  const { isAuthenticated, enableTotp, verifyTotp } = useAuth()
  const [uri, setUri] = useState<string | null>(null)
  const [factorId, setFactorId] = useState<string | null>(null)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      toast({ title: "Zaloguj się, aby skonfigurować 2FA" })
    }
  }, [isAuthenticated])

  const start = async () => {
    setLoading(true)
    const res = await enableTotp()
    if (res?.uri && res.factorId) {
      setUri(res.uri)
      setFactorId(res.factorId)
    } else {
      toast({
        title: "Nie udało się zainicjować 2FA",
        description: "Upewnij się, że włączono MFA w projekcie Supabase",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const verify = async () => {
    if (!factorId || !code) return
    setLoading(true)
    const ok = await verifyTotp(factorId, code)
    setLoading(false)
    if (ok) {
      toast({ title: "2FA włączone" })
    } else {
      toast({ title: "Błędny kod", variant: "destructive" })
    }
  }

  const qrSrc = uri ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}` : null

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Weryfikacja dwuetapowa (TOTP)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!uri ? (
              <Button onClick={() => void start()} disabled={loading}>
                Rozpocznij konfigurację
              </Button>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {qrSrc && (
                    // Using external QR service for preview convenience
                    // In production, consider rendering QR locally
                    // or using a trusted service.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={qrSrc || "/placeholder.svg"} alt="Kod QR TOTP" className="rounded border" />
                  )}
                  <p className="text-xs text-muted-foreground mt-2 break-all">
                    Jeśli nie możesz zeskanować kodu, wprowadź ręcznie: {uri}
                  </p>
                </div>
                <div>
                  <Label htmlFor="code">Kod z aplikacji</Label>
                  <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} className="max-w-xs" />
                  <div className="mt-3">
                    <Button onClick={() => void verify()} disabled={loading || !code}>
                      Potwierdź
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
