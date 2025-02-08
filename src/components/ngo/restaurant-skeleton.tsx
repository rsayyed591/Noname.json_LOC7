import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function RestaurantDetailsSkeleton() {
  return (
    <Card className="p-6 space-y-6">
      <Skeleton className="h-8 w-64 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-[300px] w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-[300px] w-full" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </Card>
  )
}

