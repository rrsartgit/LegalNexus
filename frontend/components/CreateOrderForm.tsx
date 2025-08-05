"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function CreateOrderForm() {
  const [serviceType, setServiceType] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (!serviceType || !description) {
        throw new Error("Wszystkie pola są wymagane.")
      }

      // Simulate success
      toast({
        title: "Zamówienie złożone pomyślnie!",
        description: "Twoje zamówienie zostało przyjęte do realizacji.",
      })
      setServiceType("")
      setDescription("")
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas składania zamówienia.")
      toast({
        title: "Błąd składania zamówienia",
        description: err.message || "Spróbuj ponownie.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Złóż nowe zamówienie</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="service-type">Rodzaj usługi</Label>
            <Select value={serviceType} onValueChange={setServiceType} required>
              <SelectTrigger id="service-type">
                <SelectValue placeholder="Wybierz rodzaj usługi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="analiza-dokumentow">Analiza dokumentów</SelectItem>
                <SelectItem value="pisma-prawne">Pisma prawne</SelectItem>
                <SelectItem value="konsultacje">Konsultacje</SelectItem>
                <SelectItem value="reprezentacja">Reprezentacja</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Opis zamówienia</Label>
            <Input
              id="description"
              type="text"
              placeholder="Krótki opis czego dotyczy zamówienie"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Składanie zamówienia..." : "Złóż zamówienie"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
