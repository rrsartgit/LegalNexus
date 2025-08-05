"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Bot, Send, Loader2, MessageSquare, FileText, Scale, Users, Brain, BookOpen } from "lucide-react"
import { useChat } from "ai/react"
import Image from "next/image"

interface AsystentAISectionProps {
  onBack: () => void
}

export function AsystentAISection({ onBack }: AsystentAISectionProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const exampleQueries = [
    "Jakie są moje prawa jako najemcy?",
    "Jak rozwiązać umowę o pracę?",
    "Czy mogę odwołać się od decyzji administracyjnej?",
    "Jakie dokumenty potrzebuję do założenia firmy?",
    "Jakie są terminy przedawnienia roszczeń?",
    "Procedura wniesienia pozwu do sądu",
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

        <div className="max-w-6xl mx-auto">
          {/* Hero Section with Images */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="relative w-24 h-24">
                <Image src="/images/ai-justice.png" alt="AI Justice" fill className="object-contain" />
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="relative w-24 h-24">
                <Image src="/images/brain-ai.png" alt="AI Brain" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">LexiCore - Asystent AI Prawny</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Pierwszy w Polsce profesjonalny asystent prawny oparty na sztucznej inteligencji z funkcją RAG,
              dostosowany do specyfiki polskiego systemu prawnego
            </p>
          </div>

          {/* Chat Interface */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Czat z Asystentem AI
                  </CardTitle>
                  <CardDescription>
                    Zadaj pytanie prawne, a nasz AI doradca udzieli Ci pomocy opartej na polskim prawie
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
                    {messages.length === 0 && (
                      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        <Brain className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                        <p>Zadaj pierwsze pytanie, aby rozpocząć rozmowę z asystentem AI</p>
                      </div>
                    )}
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Zadaj pytanie prawne..."
                      className="flex-1 min-h-[60px] resize-none"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>

                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Uwaga:</strong> To jest ogólna informacja prawna. Dla konkretnej porady skonsultuj się z
                      prawnikiem.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with Examples and Knowledge Base */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Przykładowe pytania</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {exampleQueries.map((example, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors w-full justify-start text-left p-2 h-auto"
                        onClick={() => handleInputChange({ target: { value: example } } as any)}
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Baza wiedzy RAG
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>• Kodeks Cywilny</p>
                    <p>• Kodeks Pracy</p>
                    <p>• Kodeks Postępowania Administracyjnego</p>
                    <p>• Kodeks Postępowania Cywilnego</p>
                    <p>• Aktualne orzecznictwo</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Grid with Images */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
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

          {/* Technology Showcase */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image src="/images/ai-knowledge.png" alt="AI Knowledge" fill className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Technologia RAG</h3>
                    <p className="text-gray-600 dark:text-gray-300">Retrieval-Augmented Generation</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Nasz system wykorzystuje zaawansowaną technologię RAG, która łączy generowanie tekstu z wyszukiwaniem
                  w bazie wiedzy prawnej, zapewniając dokładne i aktualne odpowiedzi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image src="/images/digital-justice.png" alt="Digital Justice" fill className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Polskie Prawo</h3>
                    <p className="text-gray-600 dark:text-gray-300">Specjalizacja w prawie polskim</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  System został wytrenowany specjalnie na polskim prawie, uwzględniając najnowsze przepisy, orzecznictwo
                  i praktykę prawniczą w Polsce.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
