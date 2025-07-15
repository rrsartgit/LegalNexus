"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "Jakie dokumenty mogę przesłać do analizy?",
      answer:
        "Możesz przesłać skany lub zdjęcia wszelkich dokumentów prawnych, które otrzymałeś, np. nakazy zapłaty, wezwania do sądu, pisma od komornika, umowy, itp. Ważne, aby dokument był czytelny.",
    },
    {
      question: "Jak długo trwa analiza dokumentu?",
      answer:
        "Standardowo analiza dokumentu trwa do 24 godzin od momentu zaksięgowania płatności. W przypadku bardziej skomplikowanych spraw, czas ten może się nieznacznie wydłużyć, o czym zostaniesz poinformowany.",
    },
    {
      question: "Czy moje dane są bezpieczne?",
      answer:
        "Tak, gwarantujemy pełną poufność i bezpieczeństwo Twoich danych osobowych oraz przesyłanych dokumentów. Stosujemy zaawansowane środki techniczne i organizacyjne zgodne z RODO.",
    },
    {
      question: "Czy mogę zamówić pismo prawne bez wcześniejszej analizy?",
      answer:
        "Zalecamy skorzystanie z usługi analizy dokumentów przed zamówieniem pisma prawnego. Pozwala to naszym prawnikom na pełne zrozumienie Twojej sytuacji i przygotowanie najbardziej skutecznego pisma. W wyjątkowych sytuacjach, po kontakcie, możemy rozważyć indywidualne podejście.",
    },
    {
      question: "Jakie są metody płatności?",
      answer:
        "Akceptujemy płatności kartą, przelewem bankowym oraz popularnymi systemami płatności online. Szczegółowe informacje dostępne są podczas procesu zamawiania usługi.",
    },
    {
      question: "Czy oferujecie konsultacje telefoniczne lub wideo?",
      answer:
        "Tak, oferujemy konsultacje prawne online, które mogą odbywać się w formie rozmowy telefonicznej lub wideokonferencji, w zależności od Twoich preferencji i dostępności prawnika.",
    },
    {
      question: "Co jeśli nie jestem zadowolony z usługi?",
      answer:
        "Dokładamy wszelkich starań, aby nasze usługi były najwyższej jakości. Jeśli masz jakiekolwiek zastrzeżenia, prosimy o kontakt. Rozpatrzymy Twoją sprawę indywidualnie i postaramy się znaleźć satysfakcjonujące rozwiązanie.",
    },
    {
      question: "Czy LegalNexus to kancelaria prawna?",
      answer:
        "LegalNexus to platforma online świadcząca usługi prawne, współpracująca z doświadczonymi prawnikami z Gdańska, którzy zapewniają profesjonalne wsparcie prawne.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do strony głównej
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Najczęściej Zadawane Pytania (FAQ)</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          Poniżej znajdziesz odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług. Jeśli nie znajdziesz
          odpowiedzi na swoje pytanie, skontaktuj się z nami!
        </p>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-gray-700 mb-4">Nie znalazłeś odpowiedzi?</p>
          <Button size="lg" asChild>
            <Link href="/#contact">Skontaktuj się z nami</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
