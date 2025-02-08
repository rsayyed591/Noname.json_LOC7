"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { WobbleCard } from "@/components/ngo/wobble-card"

// Sample data - replace with API call
const restaurants = [
  {
    id: "1",
    name: "Vivek Restaurant",
    foodName: "Mixed Vegetables",
    quantity: "10kg",
    peopleCount: 10,
    rating: "excellent",
    aiQuality: "Fresh and well-preserved",
    imageUrl: "/ngo/mixedveg.jpg",
    foodType: "veg",
    description: "Fresh vegetables from today's stock",
  },
  {
    id: "2",
    name: "Nishi Restaurant",
    foodName: "Chicken Biryani",
    quantity: "12kg",
    peopleCount: 12,
    rating: "excellent",
    aiQuality: "Very tasty and well-cooked",
    imageUrl: "/ngo/biryani.jpg",
    foodType: "non-veg",
    description: "Freshly cooked chicken biryani",
  },
]

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
  const [loading] = useState(false)

  const handleCardClick = (id: string) => {
    router.push(`/ngo/select-order/${id}`)
  }

  return (
    <div className="container mx-auto p-2 md:p-4 lg:p-6">
      <h1 className="text-3xl font-bold mb-6">Select Order</h1>

      {loading ? (
        <p>Loading restaurants...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <WobbleCard key={restaurant.id}>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCardClick(restaurant.id)}
              >
                <div className="relative h-48">
                  <img
                    src={restaurant.imageUrl || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                  <p className={`text-sm ${getFoodTypeColor(restaurant.foodType)}`}>
                    {restaurant.foodType.toUpperCase()}
                  </p>
                  <p className="mt-2">Food: {restaurant.foodName}</p>
                  <p>Quantity: {restaurant.quantity}</p>
                  <p>Serves: {restaurant.peopleCount} people</p>
                  <div className="mt-2 text-sm text-gray-600">AI Quality: {restaurant.aiQuality}</div>
                </div>
              </Card>
            </WobbleCard>
          ))}
        </div>
      )}
    </div>
  )
}

