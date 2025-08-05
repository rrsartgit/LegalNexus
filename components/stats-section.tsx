"use client"

import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  return (
    <section id="stats" className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nasze osiągnięcia</h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Liczby mówią same za siebie. Zaufaj profesjonalistom.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-5xl font-bold text-primary">99%</div>
              <p className="text-lg text-muted-foreground">Zadowolonych klientów</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-5xl font-bold text-primary">24h</div>
              <p className="text-lg text-muted-foreground">Średni czas odpowiedzi</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-5xl font-bold text-primary">500+</div>
              <p className="text-lg text-muted-foreground">Rozwiązanych spraw</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
