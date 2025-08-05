"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useApi } from "@/lib/api/hooks"
import { toast } from "@/components/ui/use-toast"

export default function CreateOrderForm() {
  const { user } = useAuth()
  const router = useRouter()
  const api = useApi()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [document, setDocument] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Błąd",
        description: "Musisz być zalogowany, aby złożyć zamówienie.",
        variant: "destructive",
      })
      router.push("/logowanie")
      return
    }

    if (!document) {
      toast({
        title: "Błąd",
        description: "Proszę załączyć dokument.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // In a real application, you would upload the document to a storage service
      // and get a URL, then send that URL with the order details.
      // For this example, we'll simulate the document upload.
      console.log("Simulating document upload:", document.name)

      const newOrder = {
        title,
        description,
        client_id: user.id, // Assuming client_id is the user's ID
        document_url: "https://example.com/path/to/uploaded-document.pdf", // Placeholder
        document_type: documentType,
        status: "pending", // Initial status
      }

      const response = await api.createOrder(newOrder)

      if (response) {
        toast({
          title: "Sukces",
          description: "Twoje zamówienie zostało złożone pomyślnie!",
        })
        router.push("/panel-klienta") // Redirect to client dashboard
      } else {
        throw new Error("Nie udało się złożyć zamówienia.")
      }
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Wystąpił nieoczekiwany błąd.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Złóż nowe zamówienie</CardTitle>
        <CardDescription>Wypełnij formularz, aby zamówić analizę dokumentów lub pismo prawne.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Tytuł zamówienia *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Np. Analiza nakazu zapłaty"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Opis sprawy *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opisz krótko swoją sprawę i czego oczekujesz."
              rows={5}
              required
            />
          </div>
          <div>
            <Label htmlFor="document-type">Typ dokumentu *</Label>
            <Select value={documentType} onValueChange={setDocumentType} required>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz typ dokumentu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nakaz_zaplaty">Nakaz zapłaty</SelectItem>
                <SelectItem value="wezwanie_komornika">Wezwanie komornika</SelectItem>
                <SelectItem value="umowa">Umowa</SelectItem>
                <SelectItem value="inne">Inne</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="document">Załącz dokument *</Label>
            <Input id="document" type="file" onChange={handleFileChange} required />
            <p className="text-sm text-muted-foreground mt-1">Obsługiwane formaty: PDF, DOC, JPG. Max 10MB.</p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Złóż zamówienie"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
