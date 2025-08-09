import HeroSection from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <section className="mx-auto w-full max-w-7xl px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">Analiza dokumentów</h3>
            <p className="text-sm text-muted-foreground">Szybkie i bezpieczne przetwarzanie umów, wniosków i pism.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">Asystent AI</h3>
            <p className="text-sm text-muted-foreground">
              Odpowiedzi zasilane kontekstem (RAG) na podstawie aktów prawnych.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">Panele</h3>
            <p className="text-sm text-muted-foreground">
              Rozbudowany panel administratora i operatora do zarządzania sprawami.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
