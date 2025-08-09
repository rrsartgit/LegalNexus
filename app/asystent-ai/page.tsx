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
      const answer: ChatMessage = {
        role: "assistant",
        content: data.text ?? "Przepraszam, nie mogę teraz odpowiedzieć.",
        sources: data.sources,
      }
      setMessages((m) => [...m, answer])
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Wystąpił błąd. Spróbuj ponownie za chwilę." }])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
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
              Zadaj pytanie z zakresu polskiego prawa. Model korzysta z kontekstu z bazy wiedzy (RAG).
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-4 ${m.role === "user" ? "bg-blue-50 text-gray-900" : "bg-white border"}`}
                >
                  <div className="text-xs font-medium mb-2">{m.role === "user" ? "Ty" : "Asystent"}</div>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.sources.map((s) => (
                        <Badge key={s.id} variant="secondary" className="bg-gray-100">
                          Źródło: {s.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Przykład: "Jakie są przesłanki wypowiedzenia umowy o pracę przez pracodawcę?"
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Napisz swoje pytanie. Ctrl/Cmd + Enter, aby wysłać."
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
