"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Bot, Send, Loader2, MessageSquare, FileText, Scale, Users } from "lucide-react"

interface AsystentAISectionProps {
  onBack: () => void
}

export function AsystentAISection({ onBack }: AsystentAISectionProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setResponse(
        `Na podstawie analizy Twojego zapytania: "${query}", mogę poinformować, że zgodnie z polskim prawem cywilnym, kwestie tego typu są regulowane przez Kodeks Cywilny. Zalecam skonsultowanie się z prawnikiem specjalizującym się w tej dziedzinie dla uzyskania szczegółowej porady prawnej dostosowanej do Twojej konkretnej sytuacji.`,
      )
    } catch (error) {
      setResponse("Przepraszamy, wystąpił błąd podczas przetwarzania zapytania. Spróbuj ponownie.")
    } finally {
      setIsLoading(false)
    }
  }

  const exampleQueries = [
    "Jakie są moje prawa jako najemcy?",
    "Jak rozwiązać umowę o pracę?",
    "Czy mogę odwołać się od decyzji administracyjnej?",
    "Jakie dokumenty potrzebuję do założenia firmy?",
  ]

  const features = [
    {
      icon: MessageSquare,
      title: "Natychmiastowe odpowiedzi",
      description: "Otrzymuj odpowiedzi na pytania prawne w czasie rzeczywistym",
    },
    {
      icon: FileText,
      title: "Analiza dokumentów",
      description: "Przesyłaj dokumenty do analizy i otrzymuj szczegółowe wyjaśnienia",
    },
    {
      icon: Scale,
      title: "Baza wiedzy prawnej",
      description: "Dostęp do aktualnej wiedzy z zakresu polskiego prawa",
    },
    {
      icon: Users,
      title: "Wsparcie ekspertów",
      description: "W razie potrzeby połączenie z prawnikami specjalistami",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <BackButton onClick={onBack} />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Asystent AI Prawny</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Zadaj pytanie prawne i otrzymaj natychmiastową odpowiedź opartą na polskim prawie
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Zadaj pytanie prawne
                </CardTitle>
                <CardDescription>Opisz swoją sytuację prawną, a nasz AI doradca udzieli Ci pomocy</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Np. Mam problem z wypowiedzeniem umowy najmu. Właściciel nie chce zwrócić kaucji..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-[120px]"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !query.trim()} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analizuję...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Wyślij pytanie
                      </>
                    )}
                  </Button>
                </form>

                {response && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Odpowiedź AI Asystenta:</h3>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">{response}</p>
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Uwaga:</strong> To jest ogólna informacja prawna. Dla konkretnej porady skonsultuj się z
                        prawnikiem.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Przykładowe pytania</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {exampleQueries.map((example, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors px-4 py-2"
                  onClick={() => setQuery(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
