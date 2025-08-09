"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send } from "lucide-react"

type ChatMessage = { role: "user" | "assistant"; content: string; sources?: { id: string; title: string }[] }

export default function AsystentAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const ask = async () => {
    const question = input.trim()
    if (!question) return
    setInput("")
    setMessages((m) => [...m, { role: "user", content: question }])
    try {
      setLoading(true)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: "assistant", content: data.text ?? "Brak odpowiedzi.", sources: data.sources }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Błąd serwera. Spróbuj ponownie." }])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      void ask()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Asystent AI (RAG)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Odpowiedzi powstają z użyciem Retrieval-Augmented Generation na polskich aktach prawnych (przykładowa
              baza).
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <div key={i} className={`rounded-lg p-4 ${m.role === "user" ? "bg-blue-50" : "bg-white border"}`}>
                  <div className="text-xs font-medium mb-2">{m.role === "user" ? "Ty" : "Asystent"}</div>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                  {!!m.sources?.length && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.sources!.map((s) => (
                        <Badge key={s.id} variant="secondary">
                          Źródło: {s.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Przykład: "Jakie są przesłanki wypowiedzenia umowy o pracę?"
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Zadaj pytanie (Ctrl/Cmd+Enter aby wysłać)"
              />
              <div className="flex justify-end">
                <Button onClick={() => void ask()} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Wyślij
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
