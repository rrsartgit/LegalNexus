"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function NewCaseForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [caseType, setCaseType] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Mock API call
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (!title || !description || !caseType) {
        throw new Error("Wszystkie pola są wymagane.")
      }

      // Simulate success
      toast({
        title: "Sprawa zgłoszona pomyślnie!",
        description: "Twoja sprawa została przekazana do analizy.",
      })
      setTitle("")
      setDescription("")
      setCaseType("")
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas zgłaszania sprawy.")
      toast({
        title: "Błąd zgłaszania sprawy",
        description: err.message || "Spróbuj ponownie.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Zgłoś nową sprawę</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Tytuł sprawy</Label>
            <Input
              id="title"
              type="text"
              placeholder="Np. Sprawa o odszkodowanie"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Opis sprawy</Label>
            <Textarea
              id="description"
              placeholder="Szczegółowy opis Twojej sprawy..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>
          <div>
            <Label htmlFor="case-type">Rodzaj sprawy</Label>
            <Select value={caseType} onValueChange={setCaseType} required>
              <SelectTrigger id="case-type">
                <SelectValue placeholder="Wybierz rodzaj sprawy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cywilna">Cywilna</SelectItem>
                <SelectItem value="karna">Karna</SelectItem>
                <SelectItem value="administracyjna">Administracyjna</SelectItem>
                <SelectItem value="rodzinna">Rodzinna</SelectItem>
                <SelectItem value="gospodarcza">Gospodarcza</SelectItem>
                <SelectItem value="inna">Inna</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Zgłaszanie..." : "Zgłoś sprawę"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
