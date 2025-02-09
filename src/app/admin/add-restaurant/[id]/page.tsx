"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { ExternalLink } from "lucide-react"

// Sample data - replace with API call
const restaurantDetails = {
  id: "1",
  name: "Spice Garden",
  foodType: "North Indian",
  address: "15 Park Street, Mumbai",
  gstn: "27AAPFU0939F1ZV",
  fssaiDoc: "/docs/fssai.pdf",
  panCard: "/docs/pancard.pdf",
}

export default function RestaurantDetails() {
  const router = useRouter()
  const [isApproving, setIsApproving] = useState(false)

  const handleApprove = () => {
    setIsApproving(true)
    toast.success("Restaurant has been approved!")
    setTimeout(() => {
      router.push("/admin/restaurants")
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Add Restaurant: {restaurantDetails.name}</h1>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Name:</label>
                <p>{restaurantDetails.name}</p>
              </div>
              <div>
                <label className="font-medium">Food Type:</label>
                <p>{restaurantDetails.foodType}</p>
              </div>
            </div>

            <div>
              <label className="font-medium">Address:</label>
              <p>{restaurantDetails.address}</p>
            </div>

            <div>
              <label className="font-medium">GSTN:</label>
              <p>{restaurantDetails.gstn}</p>
            </div>

            <div className="space-y-2">
              <div>
                <label className="font-medium">FSSAI Document:</label>
                <Button variant="link" className="text-blue-600" asChild>
                  <a href={restaurantDetails.fssaiDoc} target="_blank" rel="noopener noreferrer">
                    Click here to view FSSAI <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div>
                <label className="font-medium">PAN Card:</label>
                <Button variant="link" className="text-blue-600" asChild>
                  <a href={restaurantDetails.panCard} target="_blank" rel="noopener noreferrer">
                    Click here to view PAN card <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
                disabled={isApproving}
              >
                Approve
              </Button>
              <Button variant="destructive" onClick={() => router.back()} disabled={isApproving}>
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

