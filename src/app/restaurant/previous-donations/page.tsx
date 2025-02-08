"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { DonationCard } from "@/components/restaurant/donation-card"
import { DonationDetailsModal } from "@/components/restaurant/donation-details-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchRestaurantDonations } from "@/lib/service/donation"
import type { Donation } from "@/lib/types/donation"

function DonationCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-48 w-full mb-4" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function PreviousDonations() {
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["donations"],
    queryFn: fetchRestaurantDonations,
  })

  if (isError) {
    return (
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-2">Unable to load donations</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold mb-6">
        {isLoading || !data ? <Skeleton className="h-9 w-64" /> : `${data.restaurantName}'s Previous Donations`}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading || !data
          ? Array.from({ length: 6 }).map((_, i) => <DonationCardSkeleton key={i} />)
          : data.donations.map((donation) => (
              <DonationCard key={donation.id} donation={donation} onClick={() => setSelectedDonation(donation)} />
            ))}
      </div>
      

      <DonationDetailsModal
        donation={selectedDonation}
        open={!!selectedDonation}
        onOpenChange={(open) => !open && setSelectedDonation(null)}
      />
    </div>
  )
}

