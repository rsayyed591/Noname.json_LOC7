"use client"

import { useEffect, useState } from "react"
import RestaurantDetails from "@/components/admin/RestaurantDetails"

const restaurantRequests = [
  {
    id: "1",
    name: "Spice Garden",
    foodType: "North Indian",
    image: "/admin/spice-garden.jpg",
    address: "15 Park Street, Mumbai",
    gstn: "27AAPFU0939F1ZV",
    fssaiDoc: "/admin/ps.pdf",
    panCard: "/admin/ps.pdf",
    phone: "+91 9876543210",
  },
  {
    id: "2",
    name: "Green Leaf",
    foodType: "Pure Veg",
    image: "/admin/green-leaf.jpg",
    address: "22 MG Road, Bangalore",
    gstn: "29AALFG2045P1ZR",
    fssaiDoc: "/admin/ps.pdf",
    panCard: "/admin/ps.pdf",
    phone: "+91 9876543211",
  },
]
import { useParams } from "next/navigation"

export default function RestaurantPage() {
  const params = useParams<{ id: string }>()
  interface Restaurant {
    id: string;
    name: string;
    foodType: string;
    image: string;
    address: string;
    gstn: string;
    fssaiDoc: string;
    panCard: string;
    phone: string;
  }

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  useEffect(() => {
    // Fetch the restaurant based on params.id
    const foundRestaurant = restaurantRequests.find((rest) => rest.id === params.id)
    setRestaurant(foundRestaurant || null)
  }, [params.id])

  if (!restaurant) {
    return <p className="text-center text-gray-500 mt-6">Restaurant not found.</p>
  }

  return (
    <div className="container mx-auto pb-16">
      <RestaurantDetails restaurant={restaurant} />
    </div>
  )
}
