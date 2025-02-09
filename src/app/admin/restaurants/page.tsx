"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - replace with API call
const restaurants = [
  {
    id: "1",
    name: "Spice Garden",
    image: "/placeholder.svg?height=40&width=40",
    foodType: "North Indian",
    phone: "+91 9876543210",
    address: "15 Park Street, Mumbai",
    gstn: "27AAPFU0939F1ZV",
    fssaiDoc: "/docs/fssai.pdf",
    panCard: "/docs/pancard.pdf",
  },
  // Add more restaurants
]

export default function Restaurants() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<(typeof restaurants)[0] | null>(null)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Food Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={restaurant.image} alt={restaurant.name} />
                    <AvatarFallback>{restaurant.name[0]}</AvatarFallback>
                  </Avatar>
                  {restaurant.name}
                </TableCell>
                <TableCell>{restaurant.foodType}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => setSelectedRestaurant(restaurant)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedRestaurant} onOpenChange={() => setSelectedRestaurant(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Restaurant Details</DialogTitle>
          </DialogHeader>
          {selectedRestaurant && (
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedRestaurant.image} alt={selectedRestaurant.name} />
                  <AvatarFallback>{selectedRestaurant.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedRestaurant.name}</h3>
                  <p className="text-muted-foreground">{selectedRestaurant.foodType}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <p>
                  <span className="font-medium">Phone:</span> {selectedRestaurant.phone}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {selectedRestaurant.address}
                </p>
                <p>
                  <span className="font-medium">GSTN:</span> {selectedRestaurant.gstn}
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <a href={selectedRestaurant.fssaiDoc} target="_blank" rel="noopener noreferrer">
                      View FSSAI
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={selectedRestaurant.panCard} target="_blank" rel="noopener noreferrer">
                      View PAN Card
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

