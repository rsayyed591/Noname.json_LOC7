"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { ExternalLink } from "lucide-react"

interface Restaurant {
    name: string;
    foodType: string;
    address: string;
    gstn: string;
    fssaiDoc: string;
    panCard: string;
}

export default function RestaurantDetails({ restaurant }: { restaurant: Restaurant }) {
    const router = useRouter()
    const [isApproving, setIsApproving] = useState(false)

    const handleApprove = () => {
        setIsApproving(true)
        toast.success("Restaurant has been approved!")
        setTimeout(() => {
            router.push("/admin/restaurants")
        }, 3000)
    }

    return (
        <div className="container mx-auto p-2 sm:p-4 md:p-6 lg:p-8">
            <Card className="max-w-2xl mx-auto">
                <CardContent className="p-4 sm:p-6 md:p-8">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Add Restaurant: {restaurant.name}</h1>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="font-medium">Name:</label>
                                <p>{restaurant.name}</p>
                            </div>
                            <div>
                                <label className="font-medium">Food Type:</label>
                                <p>{restaurant.foodType}</p>
                            </div>
                        </div>

                        <div>
                            <label className="font-medium">Address:</label>
                            <p>{restaurant.address}</p>
                        </div>

                        <div>
                            <label className="font-medium">GSTN:</label>
                            <p>{restaurant.gstn}</p>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <label className="font-medium">FSSAI Document:</label>
                                <Button variant="link" className="text-blue-600" asChild>
                                    <a href={restaurant.fssaiDoc} target="_blank" rel="noopener noreferrer" onClick={(e) => {
                                        e.preventDefault();
                                        window.open(restaurant.fssaiDoc, 'FSSAI Document', 'width=800,height=600');
                                    }}>
                                        Click here to view FSSAI <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </div>

                            <div>
                                <label className="font-medium">PAN Card:</label>
                                <Button variant="link" className="text-blue-600" asChild>
                                <a href={restaurant.panCard} target="_blank" rel="noopener noreferrer" onClick={(e) => {
                                        e.preventDefault();
                                        window.open(restaurant.panCard, 'PanCard Document', 'width=800,height=600');
                                    }}>
                                        Click here to view PAN card <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                            <Button
                                variant="default"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={handleApprove}
                                disabled={isApproving}
                            >
                                Approve
                            </Button>
                            <Button variant="destructive" onClick={() => router.back()} disabled={isApproving}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
