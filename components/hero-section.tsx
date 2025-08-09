"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Shield, Users } from "lucide-react"

export function HeroSection() {
  const benefits = ["Analiza dokumentów w 5 minut", "Zgodność z RODO", "Wsparcie 24/7", "Integracje systemowe"]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 lg:py-28">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-7">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Kancelaria X
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">Inteligentne usługi prawne z AI</h1>
          <p className="text-lg text-muted-foreground">
            Platforma prawnicza z Asystentem AI, tworzeniem pism i obsługą klienta — wszystko w jednym miejscu.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" /> <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild>
              <Link href="/panel-klienta">
                Rozpocznij <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/jak-to-dziala">Jak to działa?</Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <span className="flex items-center gap-2 text-sm">
              <Shield className="h-5 w-5 text-green-500" />
              RODO
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Users className="h-5 w-5 text-blue-500" />
              500+ Kancelarii
            </span>
          </div>
        </div>

        <Card className="shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-0">
            <div className="relative h-[320px] w-full">
              <Image
                src="/images/digital-gavel.png"
                alt="Cyfrowy młotek sędziowski"
                fill
                className="object-cover"
                priority
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
