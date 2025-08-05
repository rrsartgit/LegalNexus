"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, FileSearch, Scale, Shield, CheckCircle, ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"
import { BackButton } from "@/components/back-button"

interface AsystentAISectionProps {
  onBack: () => void
}

export function AsystentAISection({ onBack }: AsystentAISectionProps) {
  const [demoQuery, setDemoQuery] = useState("")

  const capabilities = [
    {
      icon: FileSearch,
      title: "Analiza Dokumentów Prawnych",
      description:
        "Automatyczna analiza umów, pozwów, wyroków i innych dokumentów prawnych z wyodrębnieniem kluczowych informacji.",
      examples: [
        "Analiza ryzyka prawnego w umowach",
        "Wyodrębnienie terminów i zobowiązań",
        "Kontrola zgodności z przepisami prawa",
        "Porównywanie wersji dokumentów",
      ],
    },
    {
      icon: Scale,
      title: "Wsparcie w Orzecznictwie",
      description:
        "Przeszukiwanie baz orzecznictwa i znajdowanie precedensów prawnych istotnych dla prowadzonych spraw.",
      examples: [
        "Wyszukiwanie podobnych spraw sądowych",
        "Analiza linii orzeczniczej sądów",
        "Identyfikacja argumentów prawnych",
        "Ocena szans powodzenia sprawy",
      ],
    },
    {
      icon: MessageSquare,
      title: "Konsultacje Prawne AI",
      description: "Interaktywny asystent prawny udzielający odpowiedzi na pytania z zakresu prawa polskiego.",
      examples: [
        "Interpretacja przepisów prawnych",
        "Procedury sądowe i administracyjne",
        "Terminy i procedury prawne",
        "Wskazówki praktyczne dla prawników",
      ],
    },
  ]

  const securityFeatures = [
    "Pełna zgodność z tajemnicą adwokacką i radcowską",
    "Szyfrowanie end-to-end wszystkich danych",
    "Hosting w bezpiecznych centrach danych w UE",
    "Regularne audyty bezpieczeństwa i zgodności",
    "Brak przechowywania danych wrażliwych",
    "Zgodność z RODO i przepisami o ochronie danych",
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton onClick={onBack} />

        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-800 dark:to-blue-600 text-white py-16 rounded-lg mb-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-blue-800 text-blue-100">
              <Sparkles className="w-4 h-4 mr-2" />
              SZTUCZNA INTELIGENCJA
            </Badge>
            <h1 className="text-4xl font-bold mb-6">LexiCore - Asystent AI dla Prawników</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Pierwszy w Polsce profesjonalny asystent prawny oparty na sztucznej inteligencji, dostosowany do specyfiki
              polskiego systemu prawnego i praktyki kancelarii w Gdańsku.
            </p>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-12">
          <Card className="mb-16 dark:bg-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4 dark:text-white">Wypróbuj LexiCore w Akcji</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Zadaj pytanie prawne, aby zobaczyć, jak działa nasz asystent AI
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Np. Jakie są terminy przedawnienia roszczeń z tytułu szkody komunikacyjnej?"
                    value={demoQuery}
                    onChange={(e) => setDemoQuery(e.target.value)}
                    className="flex-1 dark:bg-gray-700 dark:text-white"
                  />
                  <Button>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Zapytaj
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">Przykładowe pytania:</h4>
                    <div className="space-y-1">
                      {[
                        "Procedura wniesienia pozwu do sądu rejonowego",
                        "Terminy w postępowaniu administracyjnym",
                        "Wymogi formalne umowy sprzedaży nieruchomości",
                        "Procedura egzekucji komorniczej",
                      ].map((question, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="justify-start h-auto p-2 text-left dark:text-gray-300 dark:hover:text-white"
                          onClick={() => setDemoQuery(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Odpowiedź LexiCore:</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Zadaj pytanie, aby otrzymać profesjonalną odpowiedź opartą na aktualnych przepisach prawa
                      polskiego i orzecznictwie sądów.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Capabilities */}
        <section className="py-12 bg-white dark:bg-gray-800 rounded-lg mb-8">
          <div className="px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Możliwości Asystenta LexiCore</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Zaawansowane funkcje AI dostosowane do codziennej pracy prawników i specyfiki polskiego prawa.
              </p>
            </div>

            <div className="space-y-12">
              {capabilities.map((capability, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <Card className="h-full dark:bg-gray-700">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                            <capability.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <CardTitle className="text-xl dark:text-white">{capability.title}</CardTitle>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{capability.description}</p>
                      </CardHeader>
                    </Card>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Przykłady zastosowań:</h4>
                      {capability.examples.map((example, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="px-8">
            <div className="text-center mb-16">
              <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Bezpieczeństwo i Etyka Zawodowa</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                LexiCore został zaprojektowany z pełnym poszanowaniem tajemnicy zawodowej i wymogów etycznych
                obowiązujących adwokatów i radców prawnych.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Scale className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
                    Ważne zastrzeżenie prawne
                  </h3>
                  <p className="mt-2 text-yellow-700 dark:text-yellow-300">
                    LexiCore jest narzędziem wspomagającym pracę prawników i nie zastępuje profesjonalnej oceny prawnej.
                    Wszystkie odpowiedzi generowane przez system wymagają weryfikacji przez kwalifikowanego prawnika
                    przed ich wykorzystaniem w praktyce zawodowej.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 dark:bg-blue-700 text-white rounded-lg mt-8">
          <div className="text-center px-8">
            <h2 className="text-3xl font-bold mb-6">Rozpocznij Współpracę z LexiCore</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Umów się na prezentację i zobacz, jak asystent AI może usprawnić pracę Twojej kancelarii.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Umów Prezentację
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
