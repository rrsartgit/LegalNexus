import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function KancelarieLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <Skeleton className="mx-auto mb-4 h-12 w-96" />
          <Skeleton className="mx-auto h-6 w-[600px]" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        {/* Law Firms Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                </div>

                {/* Specializations */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>

                {/* Lawyers */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <Skeleton className="h-10 w-20" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-10" />
            ))}
          </div>
          <Skeleton className="h-10 w-20" />
        </div>

        {/* Loading Message */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-600">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm font-medium">Ładowanie kancelarii prawnych...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
