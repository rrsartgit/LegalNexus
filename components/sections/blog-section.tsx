"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react"

interface BlogSectionProps {
  onBack: () => void
}

export function BlogSection({ onBack }: BlogSectionProps) {
  const blogPosts = [
    {
      id: 1,
      title: "Nowe przepisy RODO 2024 - co musisz wiedzieć",
      excerpt:
        "Przegląd najważniejszych zmian w przepisach o ochronie danych osobowych, które weszły w życie w 2024 roku.",
      author: "Dr Anna Kowalska",
      date: "2024-01-15",
      readTime: "8 min",
      category: "Prawo IT",
      image: "/placeholder.svg?height=200&width=400&text=RODO+2024",
      tags: ["RODO", "Ochrona danych", "Prawo IT"],
    },
    {
      id: 2,
      title: "Prawo pracy - zmiany w Kodeksie Pracy 2024",
      excerpt: "Analiza najważniejszych nowelizacji Kodeksu Pracy, które wpływają na relacje pracodawca-pracownik.",
      author: "Mec. Piotr Nowak",
      date: "2024-01-10",
      readTime: "12 min",
      category: "Prawo pracy",
      image: "/placeholder.svg?height=200&width=400&text=Kodeks+Pracy",
      tags: ["Prawo pracy", "Kodeks Pracy", "Nowelizacja"],
    },
    {
      id: 3,
      title: "Jak skutecznie dochodzić odszkodowania za wypadek",
      excerpt: "Praktyczny przewodnik po procesie dochodzenia odszkodowania za wypadek komunikacyjny i inne zdarzenia.",
      author: "Mec. Maria Wiśniewska",
      date: "2024-01-05",
      readTime: "10 min",
      category: "Prawo cywilne",
      image: "/placeholder.svg?height=200&width=400&text=Odszkodowanie",
      tags: ["Odszkodowanie", "Wypadek", "Prawo cywilne"],
    },
    {
      id: 4,
      title: "Zakładanie spółki z o.o. - przewodnik krok po kroku",
      excerpt: "Kompletny przewodnik po procesie zakładania spółki z ograniczoną odpowiedzialnością w Polsce.",
      author: "Mec. Tomasz Zieliński",
      date: "2023-12-28",
      readTime: "15 min",
      category: "Prawo gospodarcze",
      image: "/placeholder.svg?height=200&width=400&text=Spółka+z+o.o.",
      tags: ["Spółka", "Biznes", "Prawo gospodarcze"],
    },
    {
      id: 5,
      title: "Mediacja jako alternatywa dla sądu",
      excerpt: "Dlaczego warto rozważyć mediację zamiast długotrwałego procesu sądowego - korzyści i ograniczenia.",
      author: "Dr Katarzyna Lewandowska",
      date: "2023-12-20",
      readTime: "6 min",
      category: "Mediacja",
      image: "/placeholder.svg?height=200&width=400&text=Mediacja",
      tags: ["Mediacja", "ADR", "Rozwiązywanie sporów"],
    },
    {
      id: 6,
      title: "Prawo nieruchomości - kupno mieszkania w 2024",
      excerpt: "Aktualne przepisy dotyczące kupna nieruchomości, kredytów hipotecznych i bezpiecznych transakcji.",
      author: "Mec. Andrzej Kowalczyk",
      date: "2023-12-15",
      readTime: "11 min",
      category: "Prawo nieruchomości",
      image: "/placeholder.svg?height=200&width=400&text=Nieruchomości",
      tags: ["Nieruchomości", "Kupno", "Kredyt hipoteczny"],
    },
  ]

  const categories = [
    { name: "Wszystkie", count: blogPosts.length, active: true },
    { name: "Prawo IT", count: 1, active: false },
    { name: "Prawo pracy", count: 1, active: false },
    { name: "Prawo cywilne", count: 1, active: false },
    { name: "Prawo gospodarcze", count: 1, active: false },
    { name: "Mediacja", count: 1, active: false },
    { name: "Prawo nieruchomości", count: 1, active: false },
  ]

  const featuredPost = blogPosts[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <BackButton onClick={onBack} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Prawny</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Najnowsze artykuły, analizy i komentarze prawne od naszych ekspertów
            </p>
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <Badge className="mb-3">{featuredPost.category}</Badge>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{featuredPost.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.date).toLocaleDateString("pl-PL")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button>
                  Czytaj więcej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
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

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString("pl-PL")}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Czytaj więcej
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Załaduj więcej artykułów
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
