"use client"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onSectionChange: (section: string) => void
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground">
      <div className="container px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">Legal API Nexus</h1>
          <p className="text-lg md:text-xl">
            Profesjonalna pomoc prawna online. Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w ciągu 24
            godzin. Szybko, skutecznie i w przystępnej cenie.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => onSectionChange("analiza-dokumentow")}
            >
              Rozpocznij analizę dokumentów
            </Button>
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              onClick={() => onSectionChange("jak-to-dziala")}
            >
              Dowiedz się więcej
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
