"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, PlusCircle } from "lucide-react"

type DocumentItem = {
  id: string
  title: string
  content: string
  type: string
  status: string
  created_at: string
}

export default function PismaPrawnePage() {
  const [title, setTitle] = useState("")
  const [type, setType] = useState("sprzeciw")
  const [recipientName, setRecipientName] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [docs, setDocs] = useState<DocumentItem[]>([])
  const [loadingList, setLoadingList] = useState(false)

  async function fetchDocs() {
    try {
      setLoadingList(true)
      const res = await fetch("/api/documents")
      const data = await res.json()
      setDocs(data.documents || [])
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => {
    void fetchDocs()
  }, [])

  async function submit() {
    if (!title || !content) return
    try {
      setLoading(true)
      const fd = new FormData()
      fd.append("title", title)
      fd.append("type", type)
      fd.append("recipientName", recipientName)
      fd.append("recipientAddress", recipientAddress)
      fd.append("content", content)
      const res = await fetch("/api/documents", { method: "POST", body: fd })
      if (!res.ok) throw new Error("Błąd zapisu")
      setTitle("")
      setContent("")
      setRecipientName("")
      setRecipientAddress("")
      await fetchDocs()
    } finally {
      setLoading(false)
    }
  }

  async function markSubmitted(id: string) {
    const res = await fetch(`/api/documents/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "submitted" }),
    })
    if (res.ok) await fetchDocs()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Utwórz pismo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tytuł</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="type">Typ</Label>
                <Input id="type" value={type} onChange={(e) => setType(e.target.value)} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rname">Adresat</Label>
                <Input id="rname" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="raddr">Adres</Label>
                <Input id="raddr" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Treść</Label>
              <Textarea id="content" rows={10} value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <Button onClick={() => void submit()} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              Zapisz szkic
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moje pisma</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loadingList && <div>Ładowanie…</div>}
            {!loadingList && docs.length === 0 && <div>Brak pism</div>}
            {docs.map((d) => (
              <div key={d.id} className="border rounded p-3 bg-white flex items-center justify-between">
                <div>
                  <div className="font-medium">{d.title}</div>
                  <div className="text-xs text-muted-foreground">{new Date(d.created_at).toLocaleString("pl-PL")}</div>
                  <div className="mt-1 flex gap-2">
                    <Badge variant="secondary">Typ: {d.type}</Badge>
                    <Badge>Status: {d.status}</Badge>
                  </div>
                </div>
                {d.status === "draft" && (
                  <Button variant="outline" onClick={() => void markSubmitted(d.id)}>
                    Wyślij do analizy
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
