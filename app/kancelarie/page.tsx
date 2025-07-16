"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchLawFirms } from "@/lib/api/hooks"
import { ArrowLeft, Search, MapPin, Phone, Mail, Globe, Users, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function KancelariePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("")

  const { lawFirms, loading, error, total, page, pages, hasNext, hasPrev, search, nextPage, prevPage } =
    useSearchLawFirms()

  const handleSearch = () => {
    const params: any = {}
    if (searchQuery) params.q = searchQuery
    if (selectedCity) params.city = selectedCity
    if (selectedSpecialization) params.specializations = [selectedSpecialization]

    search(params)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCity("")
    setSelectedSpecialization("")
    search({})
  }

  // Cities for filter dropdown
  const cities = ["Gdańsk", "Warszawa", "Kraków", "Wrocław", "Poznań", "Łódź"]

  // Specializations for filter dropdown
  const specializations = [
    { code: "COMMERCIAL", name: "Prawo Gospodarcze" },
    { code: "CIVIL", name: "Prawo Cywilne" },
    { code: "CRIMINAL", name: "Prawo Karne" },
    { code: "LABOR", name: "Prawo Pracy" },
    { code: "ADMINISTRATIVE", name: "Prawo Administracyjne" },
    { code: "TAX", name: "Prawo Podatkowe" },
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

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wyszukaj Kancelarię Prawną</h1>
          <p className="text-lg text-gray-600">
            Znajdź profesjonalną pomoc prawną w swojej okolicy. Przeszukaj bazę zweryfikowanych kancelarii prawnych.
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Filtry wyszukiwania
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Nazwa kancelarii..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz miasto" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specjalizacja" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec.code} value={spec.code}>
                        {spec.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  <Search className="mr-2 h-4 w-4" />
                  Szukaj
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Wyczyść
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Wyszukiwanie kancelarii...</p>
          </div>
        )}

        {error && (
          <Card className="mb-8">
            <CardContent className="py-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => search({})} variant="outline">
                Spróbuj ponownie
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && !error && (
          <>
            {/* Results Summary */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Znaleziono <span className="font-semibold">{total}</span> kancelarii
                {total > 0 && (
                  <span>
                    {" "}
                    (strona {page} z {pages})
                  </span>
                )}
              </p>
            </div>

            {/* Law Firms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {lawFirms.map((firm) => (
                <Card key={firm.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{firm.name}</CardTitle>
                    {firm.description && <p className="text-sm text-gray-600 line-clamp-2">{firm.description}</p>}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Address */}
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          {firm.address.street}
                          <br />
                          {firm.address.postal_code} {firm.address.city}
                        </span>
                      </div>

                      {/* Contact */}
                      <div className="space-y-1">
                        {firm.contact.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{firm.contact.phone}</span>
                          </div>
                        )}
                        {firm.contact.email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{firm.contact.email}</span>
                          </div>
                        )}
                        {firm.contact.website && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Globe className="h-4 w-4 mr-2" />
                            <a
                              href={firm.contact.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Strona internetowa
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Lawyers count */}
                      {firm.lawyers && firm.lawyers.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            {firm.lawyers.length} prawnik{firm.lawyers.length !== 1 ? "ów" : ""}
                          </span>
                        </div>
                      )}

                      {/* Specializations */}
                      {firm.specializations && firm.specializations.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {firm.specializations.slice(0, 3).map((spec) => (
                            <Badge key={spec.id} variant="secondary" className="text-xs">
                              {spec.name}
                            </Badge>
                          ))}
                          {firm.specializations.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{firm.specializations.length - 3} więcej
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="pt-3">
                        <Button className="w-full" size="sm">
                          Zobacz szczegóły
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={!hasPrev}
                  className="flex items-center bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Poprzednia
                </Button>

                <span className="text-sm text-gray-600">
                  Strona {page} z {pages}
                </span>

                <Button
                  variant="outline"
                  onClick={nextPage}
                  disabled={!hasNext}
                  className="flex items-center bg-transparent"
                >
                  Następna
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}

            {/* No results */}
            {lawFirms.length === 0 && !loading && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nie znaleziono kancelarii</h3>
                  <p className="text-gray-600 mb-4">Spróbuj zmienić kryteria wyszukiwania lub wyczyść filtry.</p>
                  <Button onClick={handleReset} variant="outline">
                    Wyczyść filtry
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
