"use client"
import Link from "next/link"
// import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import Image from "next/image"

// Sample data - replace with API call
const restaurantRequests = [
  {
    id: "1",
    name: "Spice Garden",
    foodType: "North Indian",
    image: "/placeholder.svg?height=200&width=300",
    address: "15 Park Street, Mumbai",
    gstn: "27AAPFU0939F1ZV",
    fssaiDoc: "/docs/fssai.pdf",
    panCard: "/docs/pancard.pdf",
    phone: "+91 9876543210",
  },
  {
    id: "2",
    name: "Green Leaf",
    foodType: "Pure Veg",
    image: "/placeholder.svg?height=200&width=300",
    address: "22 MG Road, Bangalore",
    gstn: "29AALFG2045P1ZR",
    fssaiDoc: "/docs/fssai.pdf",
    panCard: "/docs/pancard.pdf",
    phone: "+91 9876543211",
  },
  // Add more restaurant requests as needed
]

export default function AddRestaurant() {
  // const router = useRouter()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurant Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantRequests.map((restaurant) => (
          <Link key={restaurant.id} href={`/admin/add-restaurant/${restaurant.id}`} target="_blank">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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

