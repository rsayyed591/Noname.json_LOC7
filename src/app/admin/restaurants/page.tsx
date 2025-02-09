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
<<<<<<< Updated upstream
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Resgistered Restaurants</h2>
      </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-200 hover:bg-blue-300 text-blue-800">
              <Plus className="mr-2 h-4 w-4" />
              Add New Restaurants
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Restaurants</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="password"
                  value={newAgent.password}
                  onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  value={newAgent.image}
                  onChange={(e) => setNewAgent({ ...newAgent, image: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>
            <Button onClick={handleAddAgent}>Add Agent</Button>
          </DialogContent>
        </Dialog>
=======
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
>>>>>>> Stashed changes
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

