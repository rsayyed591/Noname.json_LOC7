"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Frown, Meh, Smile } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Donation } from "@/lib/types/donation"

const ratingEmojis = {
  excellent: Smile,
  good: Meh,
  bad: Frown,
}

const ratingColors = {
  excellent: "text-green-500",
  good: "text-yellow-500",
  bad: "text-red-500",
}

interface DonationCardProps {
  donation: Donation
  onClick: () => void
}

export function DonationCard({ donation, onClick }: DonationCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const RatingIcon = ratingEmojis[donation.rating]

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: isHovered ? [-1, 1.5, 0] : 0 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Card className="cursor-pointer">
        <CardHeader className="relative p-4">
          <div className="relative h-48 w-full mb-4">
            <Image
              src={donation.imageUrl || "/placeholder.svg"}
              alt={donation.foodName}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <CardTitle className="text-lg">{donation.foodName}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Quantity: {donation.quantity} / Serves: {donation.peopleCount}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{donation.ngoName}</p>
              <RatingIcon className={cn("h-5 w-5", ratingColors[donation.rating])} />
            </div>
            <p className="text-sm text-muted-foreground">{donation.aiQuality}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

