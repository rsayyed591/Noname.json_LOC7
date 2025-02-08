"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { DonationCard } from "@/components/restaurant/donation-card"
import { DonationDetailsModal } from "@/components/restaurant/donation-details-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchRestaurantDonations } from "@/lib/service/donation"
import type { Donation } from "@/lib/types/donation"

interface ReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (review: string) => void
}

function ReviewModal({ open, onOpenChange, onSubmit }: ReviewModalProps) {
  const [review, setReview] = useState("")

  const handleSubmit = () => {
    onSubmit(review)
    setReview("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmit} disabled={!review.trim()}>
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

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
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewedDonations, setReviewedDonations] = useState<Set<string>>(new Set())

  const { data, isLoading, isError } = useQuery({
    queryKey: ["donations"],
    queryFn: fetchRestaurantDonations,
  })

  const handleReviewSubmit = (review: string) => {
    if (selectedDonation) {
      // Here you would typically send the review to your backend
      console.log(`Review submitted for donation ${selectedDonation.id}:`, review)
      setReviewedDonations(new Set([...reviewedDonations, selectedDonation.id]))
    }
  }

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
              <div key={donation.id} className="space-y-2">
                <DonationCard donation={donation} onClick={() => setSelectedDonation(donation)} />
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={reviewedDonations.has(donation.id)}
                  onClick={() => {
                    setSelectedDonation(donation)
                    setShowReviewModal(true)
                  }}
                >
                  {reviewedDonations.has(donation.id) ? "Reviewed" : "Write Review"}
                </Button>
              </div>
            ))}
      </div>

      <DonationDetailsModal
        donation={selectedDonation}
        open={!!selectedDonation && !showReviewModal}
        onOpenChange={(open) => !open && setSelectedDonation(null)}
      />

      <ReviewModal open={showReviewModal} onOpenChange={setShowReviewModal} onSubmit={handleReviewSubmit} />
    </div>
  )
}

