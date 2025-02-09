"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - replace with API call
const ngos = [
  {
    id: "1",
    name: "Helping Hands Foundation",
    image: "/placeholder.svg?height=40&width=40",
    phone: "+91 9876543210",
    address: "45 Civil Lines, Delhi",
    panCard: "/admin/ps.pdf",
  },
  // Add more NGOs
]

export default function NGOs() {
  const [selectedNGO, setSelectedNGO] = useState<(typeof ngos)[0] | null>(null)

  return (
    <div className="container mx-auto pb-16 max-w-xs">
      <h1 className="text-3xl font-bold mb-6">NGOs</h1>

      <div className="border rounded-lg overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>NGO</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ngos.map((ngo) => (
              <TableRow key={ngo.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={ngo.image} alt={ngo.name} />
                    <AvatarFallback>{ngo.name[0]}</AvatarFallback>
                  </Avatar>
                  {ngo.name}
                </TableCell>
                <TableCell>{ngo.phone}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => setSelectedNGO(ngo)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedNGO} onOpenChange={() => setSelectedNGO(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>NGO Details</DialogTitle>
          </DialogHeader>
          {selectedNGO && (
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedNGO.image} alt={selectedNGO.name} />
                  <AvatarFallback>{selectedNGO.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedNGO.name}</h3>
                </div>
              </div>

              <div className="grid gap-2">
                <p>
                  <span className="font-medium">Phone:</span> {selectedNGO.phone}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {selectedNGO.address}
                </p>
                <Button variant="outline" asChild>
                  <a href={selectedNGO.panCard} target="_blank" rel="noopener noreferrer">
                    View PAN Card
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
