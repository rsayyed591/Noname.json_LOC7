"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import Image from "next/image"

// Sample data - replace with API call
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

export default function AddRestaurant() {
  return (
    <div className="container mx-auto pb-16">
      <h1 className="text-3xl font-bold mb-6">Restaurant Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantRequests.map((restaurant) => (
          <Link 
            key={restaurant.id} 
            href={{
              pathname: `/admin/add-restaurant/${restaurant.id}`,
              query: restaurant,
            }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{restaurant.name}</h3>
                <p className="text-sm text-muted-foreground">{restaurant.foodType}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
