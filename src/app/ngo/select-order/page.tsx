"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { WobbleCard } from "@/components/ngo/wobble-card"
import  APIservice  from "@/api/api"
interface Donation {
  donation_id: string
  doner_id: string
  food_name: string
  quantity: number
  food_image: string
  type: string
  no_of_people: number
  location_of_food: {
    lat: number
    lon: number
  }
  id: string
}

const getFoodTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "veg":
      return "text-green-600"
    case "non-veg":
      return "text-red-600"
    case "jain":
      return "text-yellow-600"
    default:
      return "text-gray-600"
  }
}

export default function SelectOrder() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const lat = "18.93248"
        const lon = "72.83152"
        const distance = "10 "
        const response = await APIservice.getDonations({lat, lon, distance})
        setDonations(response.data.donations)
      } catch (error) {
        console.error("Error fetching donations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  const handleCardClick = (id: string) => {
    router.push(`/ngo/select-order/${id}`)
  }

  return (
    <div className="container mx-auto p-2 md:p-4 lg:p-6">
      <h1 className="text-3xl font-bold mb-6">Select Order</h1>

      {loading ? (
        <p>Loading donations...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations?.map((donation) => (
            <WobbleCard key={donation.donation_id}>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCardClick(donation.donation_id)}
              >
                <div className="relative h-48">
                  <img
                    src={"https://43d4-14-139-125-227.ngrok-free.app/"+donation.food_image || "/placeholder.svg"}
                    alt={donation.food_name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{donation.food_name}</h3>
                  <p className={`text-sm ${getFoodTypeColor(donation.type)}`}>{donation.type.toUpperCase()}</p>
                  <p className="mt-2">Quantity: {donation.quantity} kg</p>
                  <p>Serves: {donation.no_of_people} people</p>
                  <div className="mt-2 text-sm text-gray-600">
                    Location: {donation.location_of_food.lat.toFixed(4)}, {donation.location_of_food.lon.toFixed(4)}
                  </div>
                </div>
              </Card>
            </WobbleCard>
          ))}
        </div>
      )}
    </div>
  )
}

