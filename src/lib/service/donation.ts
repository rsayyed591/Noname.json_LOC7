import type { RestaurantDonations } from "../types/donation"

export async function fetchRestaurantDonations(): Promise<RestaurantDonations> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate API error sometimes
  if (Math.random() > 0.7) {
    throw new Error("Failed to fetch donations")
  }

  return {
    restaurantName: "Sample Restaurant",
    donations: [
      {
        id: "1",
        foodName: "Mixed Vegetables",
        quantity: "5kg",
        peopleCount: 10,
        ngoName: "Food For All",
        rating: "excellent",
        aiQuality: "Fresh and well-preserved",
        imageUrl: "/placeholder.svg",
        createdAt: new Date().toISOString(),
        foodType: "veg",
        description: "Fresh vegetables from today's stock",
        status: "delivered",
      },
      // Add more mock donations...
    ],
  }
}

