export type Rating = "excellent" | "good" | "bad"

export interface Donation {
  id: string
  foodName: string
  quantity: string
  peopleCount: number
  ngoName: string
  rating: Rating
  aiQuality: string
  imageUrl: string
  createdAt: string
  // Additional details for modal
  foodType: "veg" | "nonveg" | "jain"
  description?: string
  status: "accepted" | "delivered" | "pending"
}

export interface RestaurantDonations {
  restaurantName: string
  donations: Donation[]
}

