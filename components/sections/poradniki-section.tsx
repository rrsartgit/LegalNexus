"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Download, Eye, Star, Clock, FileText, Scale, Users, Building, Home, Car } from "lucide-react"

interface PoradnikiSectionProps {
  onBack: () => void
}

export function PoradnikiSection({ onBack }: PoradnikiSectionProps) {
  const guides = [
    {
      id: 1,
      title: "Jak napisać pozew do sądu - kompletny przewodnik",
      description: "Szczegółowy przewodnik po pisaniu pozwu, wymaganych dokumentach i procedurach sądowych.",
      category: "Prawo procesowe",
      difficulty: "Średni",
      readTime: "25 min",
      downloads: 1250,
      views: 5420,
      rating: 4.8,
      icon: Scale,
      tags: ["Pozew", "Sąd", "Procedura"],
      featured: true,
    },
    {
      id: 2,
      title: "Rozwiązanie umowy o pracę - wzory i procedury",
      description: "Wszystko o wypowiadaniu umów o pracę, okresach wypowiedzenia i prawach pracownika.",
      category: "Prawo pracy",
      difficulty: "Łatwy",
      readTime: "15 min",
      downloads: 2100,
      views: 8750,
      rating: 4.9,
      icon: Users,
      tags: ["Umowa o pracę", "Wypowiedzenie", "Prawa pracownika"],
      featured: true,
    },
    {
      id: 3,
      title: "Zakładanie działalności gospodarczej krok po kroku",
      description: "Przewodnik po rejestracji działalności, wyborze formy opodatkowania i obowiązkach.",
      category: "Prawo gospodarcze",
      difficulty: "Średni",
      readTime: "30 min",
      downloads: 1800,
      views: 6200,
      rating: 4.7,
      icon: Building,
      tags: ["Działalność", "Rejestracja", "Podatki"],
      featured: false,
    },
    {
      id: 4,
      title: "Kupno mieszkania - prawne aspekty transakcji",
      description: "Kompletny przewodnik po kupnie nieruchomości, umowach i zabezpieczeniach prawnych.",
      category: "Prawo nieruchomości",
      difficulty: "Średni",
      readTime: "20 min",
      downloads: 950,
      views: 3100,
      rating: 4.6,
      icon: Home,
      tags: ["Nieruchomości", "Kupno", "Umowa"],
      featured: false,
    },
    {
      id: 5,
      title: "Odszkodowanie za wypadek komunikacyjny",
      description: "Jak dochodzić odszkodowania po wypadku, jakie dokumenty zbierać i jak negocjować.",
      category: "Prawo cywilne",
      difficulty: "Łatwy",
      readTime: "18 min",
      downloads: 1400,
      views: 4800,
      rating: 4.5,
      icon: Car,
      tags: ["Wypadek", "Odszkodowanie", "Ubezpieczenie"],
      featured: false,
    },
    {
      id: 6,
      title: "Ochrona danych osobowych w firmie - RODO",
      description: "Praktyczny przewodnik po wdrażaniu RODO w małej i średniej firmie.",
      category: "Prawo IT",
      difficulty: "Trudny",
      readTime: "35 min",
      downloads: 720,
      views: 2400,
      rating: 4.4,
      icon: FileText,
      tags: ["RODO", "Ochrona danych", "Compliance"],
      featured: false,
    },
  ]

  const categories = [
    { name: "Wszystkie", count: guides.length, active: true },
    { name: "Prawo procesowe", count: 1, active: false },
    { name: "Prawo pracy", count: 1, active: false },
    { name: "Prawo gospodarcze", count: 1, active: false },
    { name: "Prawo nieruchomości", count: 1, active: false },
    { name: "Prawo cywilne", count: 1, active: false },
    { name: "Prawo IT", count: 1, active: false },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Łatwy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Średni":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Trudny":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const featuredGuides = guides.filter((guide) => guide.featured)
  const regularGuides = guides.filter((guide) => !guide.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <BackButton onClick={onBack} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Poradniki Prawne</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Praktyczne przewodniki i wzory dokumentów prawnych do pobrania
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Szukaj poradników..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Szukaj
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.active ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Guides */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Polecane poradniki</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden border-2 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                          <guide.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <Badge className="mb-2">{guide.category}</Badge>
                          <Badge className={`ml-2 ${getDifficultyColor(guide.difficulty)}`}>{guide.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{guide.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {guide.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {guide.downloads.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {guide.views.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {guide.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Czytaj
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Pobierz PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Guides */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Wszystkie poradniki</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularGuides.map((guide) => (
                <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <guide.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{guide.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <Badge className={getDifficultyColor(guide.difficulty)}>{guide.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{guide.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {guide.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {guide.downloads}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {guide.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Czytaj
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Załaduj więcej poradników
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
