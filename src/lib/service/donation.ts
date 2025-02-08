import type { RestaurantDonations } from "../types/donation";

export async function fetchRestaurantDonations(): Promise<RestaurantDonations> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate API error sometimes
  if (Math.random() > 0.7) {
    throw new Error("Failed to fetch donations");
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
        imageUrl: "/restaurant/front-close-view-vegetable-salad-with-seasonings-blue-background.jpg",
        createdAt: new Date().toISOString(),
        foodType: "veg",
        description: "Fresh vegetables from today's stock",
        status: "delivered",
      },
      // Add more mock donations here
      {
        id: "2",
        foodName: "Paneer Tikka",
        quantity: "2kg",
        peopleCount: 5,
        ngoName: "Food For All",
        rating: "good",
        aiQuality: "Fresh and well-cooked",
        imageUrl: "/restaurant/gourmet-bowl-with-healthy-rice-meat-vegetables-generated-by-ai.jpg",
        createdAt: new Date().toISOString(),
        foodType: "veg",
        status: "accepted",
      },
      {
        id: "3",
        foodName: "Chicken Biryani",
        quantity: "3kg",
        peopleCount: 8,
        ngoName: "Food For All",
        rating: "bad",
        aiQuality: "Stale and poorly cooked",
        imageUrl: "/restaurant/gourmet-chicken-biryani-with-steamed-basmati-rice-generated-by-ai.jpg",
        createdAt: new Date().toISOString(),
        foodType: "nonveg",
        description: "Leftover from a party",
        status: "pending",
      },
      {
        id: "4",
        foodName: "Veg Biryani",
        quantity: "4kg",
        peopleCount: 12,
        ngoName: "Food For All",
        rating: "good",
        aiQuality: "Fresh and well-cooked",
        imageUrl: "/restaurant/veg-biryani-veg-pulav-fried-rice-indian-food-generative-ai.jpg",
        createdAt: new Date().toISOString(),
        foodType: "veg",
        status: "accepted",

      },
      {
        id: "5",
        foodName: "Paneer Butter Masala",
        quantity: "3kg",
        peopleCount: 8,
        ngoName: "Food For All",
        rating: "good",
        aiQuality: "Fresh and well-cooked",
        imageUrl: "/chicken-skewers-with-slices-apples-chili.jpg",
        createdAt: new Date().toISOString(),
        foodType: "veg",
        status: "accepted",
      }
    ],
  };
}
