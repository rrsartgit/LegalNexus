"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Phone, Mail, Globe, Users, Scale, Filter, Grid, List } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchLawFirms } from "@/lib/api/hooks"
import type { SearchParams } from "@/lib/api/types"

const cities = [
  "Gdańsk",
  "Warszawa",
  "Kraków",
  "Wrocław",
  "Poznań",
  "Łódź",
  "Szczecin",
  "Bydgoszcz",
  "Lublin",
  "Katowice",
]

const specializations = [
  { code: "COMMERCIAL", name: "Prawo Gospodarcze" },
  { code: "CIVIL", name: "Prawo Cywilne" },
  { code: "CRIMINAL", name: "Prawo Karne" },
  { code: "LABOR", name: "Prawo Pracy" },
  { code: "ADMINISTRATIVE", name: "Prawo Administracyjne" },
  { code: "TAX", name: "Prawo Podatkowe" },
  { code: "INTERNATIONAL", name: "Prawo Międzynarodowe" },
  { code: "IP", name: "Własność Intelektualna" },
  { code: "BANKING", name: "Prawo Bankowe" },
  { code: "INSURANCE", name: "Prawo Ubezpieczeniowe" },
]

export default function KancelariePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")

  const { lawFirms, loading, error, total, page, pages, hasNext, hasPrev, search, nextPage, prevPage } =
    useSearchLawFirms()

  const handleSearch = () => {
    const params: SearchParams = {
      q: searchQuery || undefined,
      city: selectedCity === "all" ? undefined : selectedCity,
      specializations: selectedSpecializations.length > 0 ? selectedSpecializations : undefined,
      sort: sortBy,
      page: 1,
    }
    search(params)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCity("all")
    setSelectedSpecializations([])
    setSortBy("name")
    search({})
  }

  useEffect(() => {
    // Initial load
    search({})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Kancelarie Prawne w Polsce</h1>
          <p className="text-lg text-gray-600">Znajdź profesjonalną pomoc prawną dostosowaną do Twoich potrzeb</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Wyszukaj kancelarię</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Nazwa kancelarii, specjalizacja..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Miasto</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz miasto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie miasta</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Specjalizacja</label>
                <Select
                  value={selectedSpecializations[0] || "all"}
                  onValueChange={(value) => setSelectedSpecializations(value ? [value] : [])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz specjalizację" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie specjalizacje</SelectItem>
                    {specializations.map((spec) => (
                      <SelectItem key={spec.code} value={spec.code}>
                        {spec.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                  <Search className="mr-2 h-4 w-4" />
                  Szukaj
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <Filter className="mr-2 h-4 w-4" />
                  Wyczyść
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nazwa A-Z</SelectItem>
                    <SelectItem value="city">Miasto</SelectItem>
                    <SelectItem value="created_at">Najnowsze</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex rounded-md border">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {loading ? "Wyszukiwanie..." : `Znaleziono ${total} kancelarii prawnych`}
            {page > 1 && ` (strona ${page} z ${pages})`}
          </p>
          {!loading && total > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                Strona {page} z {pages}
              </span>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-600">Błąd: {error}</p>
            </CardContent>
          </Card>
        )}

        {/* Law Firms Grid */}
        {!loading && lawFirms.length > 0 && (
          <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {lawFirms.map((firm) => (
              <Card key={firm.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900">{firm.name}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {firm.krs_number ? `KRS: ${firm.krs_number}` : `NIP: ${firm.tax_number}`}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Scale className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Description */}
                  {firm.description && <p className="text-sm text-gray-600 line-clamp-2">{firm.description}</p>}

                  {/* Address */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {firm.address.street}, {firm.address.city} {firm.address.postal_code}
                      </span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-1">
                    {firm.contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{firm.contact.phone}</span>
                      </div>
                    )}
                    {firm.contact.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{firm.contact.email}</span>
                      </div>
                    )}
                    {firm.contact.website && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="h-4 w-4" />
                        <span className="truncate">{firm.contact.website}</span>
                      </div>
                    )}
                  </div>

                  {/* Specializations */}
                  {firm.specializations && firm.specializations.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-700">Specjalizacje:</p>
                      <div className="flex flex-wrap gap-1">
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
                    </div>
                  )}

                  {/* Lawyers */}
                  {firm.lawyers && firm.lawyers.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>
                          {firm.lawyers.length} {firm.lawyers.length === 1 ? "prawnik" : "prawników"}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {firm.lawyers
                          .slice(0, 2)
                          .map((lawyer) => `${lawyer.title || ""} ${lawyer.first_name} ${lawyer.last_name}`.trim())
                          .join(", ")}
                        {firm.lawyers.length > 2 && ` i ${firm.lawyers.length - 2} innych`}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Zobacz szczegóły</Button>
                    <Button variant="outline" size="sm">
                      Kontakt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && lawFirms.length === 0 && !error && (
          <Card className="text-center">
            <CardContent className="py-12">
              <Scale className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Nie znaleziono kancelarii</h3>
              <p className="text-gray-600">Spróbuj zmienić kryteria wyszukiwania lub wyczyść filtry.</p>
              <Button onClick={handleReset} className="mt-4 bg-transparent" variant="outline">
                Wyczyść filtry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {!loading && lawFirms.length > 0 && pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button onClick={prevPage} disabled={!hasPrev} variant="outline">
              Poprzednia
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(pages - 4, page - 2)) + i
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => search({ page: pageNum })}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button onClick={nextPage} disabled={!hasNext} variant="outline">
              Następna
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
