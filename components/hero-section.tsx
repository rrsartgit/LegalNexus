import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Kancelaria X</h1>
          <p className="text-lg text-muted-foreground">
            Skuteczne wsparcie prawne z wykorzystaniem najnowszych technologii analizy dokumentów i asystenta AI.
          </p>
          <div className="flex gap-3">
            <Link
              href="/asystent-ai"
              className="rounded-md bg-foreground px-4 py-2 text-background transition hover:opacity-90"
            >
              Uruchom Asystenta
            </Link>
            <Link href="/cennik" className="rounded-md border px-4 py-2 transition hover:bg-muted">
              Zobacz cennik
            </Link>
          </div>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border bg-muted">
          <Image
            src="/images/digital-gavel.png"
            alt="Cyfrowy młotek sędziowski symbolizujący prawo i technologię"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
