"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useJsApiLoader } from "@react-google-maps/api"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RestaurantDetailsSkeleton } from "@/components/ngo/restaurant-skeleton"
import confetti from "canvas-confetti"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useParams } from "next/navigation"
import axios from "axios"
import { Doughnut } from "react-chartjs-2"
import APIservice from "@/api/api"
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const GOOGLE_MAPS_API_KEY = "xxxx"

const agentsData = {
  agents: [
    {
      id: "1",
      name: "Vivek Chouhan",
      stars: 4,
      image: "/ngo/delivery-agent.jpg",
    },
    {
      id: "2",
      name: "Rahul Kumar",
      stars: 4,
      image: "/ngo/delivery-agent.jpg",
    },
    {
      id: "3",
      name: "Priya Singh",
      stars: 4,
      image: "/ngo/delivery-agent.jpg",
    },
    {
      id: "4",
      name: "Amit Patel",
      stars: 4,
      image: "/ngo/delivery-agent.jpg",
    },
  ],
}

export default function OrderDetails() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showFoodDetails, setShowFoodDetails] = useState(false)
  const [showDeliveryAgents, setShowDeliveryAgents] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [quantity, setQuantity] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const { orderid } = useParams()
  const [orderDetails, setOrderDetails] = useState({
    id: "V8dDtsidGR4D8kZgNelZz",
    foodName: "Chicken",
    quantity: 3,
    capacity: 8,
    foodImage: "uploads/1739069393151_Screenshot 2025-02-05 013352.png",
    type: "Non veg",
    aiBasedQuality: null,
    qrCodePath: null,
    createdAt: "2025-02-09T08:19:53.174027",
  })
  const [items, setItems] = useState([])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await APIservice.detailsDonations(orderid)
        setOrderDetails(response.data.donations)
        console.log("Order Details:", response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching donation details:", error)
        setLoading(false)
      }
    }
    fetchDonations()
  }, [])

  const handleConfirmOrder = () => {
    setShowSuccess(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    setShowDeliveryAgents(false)

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push("/ngo")
    }, 3000)
  }

  const fetchItems = async () => {
    try {
      const response = await APIservice.listDeliveryAgents()
      setItems(response.data)
      setShowDeliveryAgents(true)
    } catch (error) {
      console.error("Error fetching items:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  if (loading) {
    return <RestaurantDetailsSkeleton />
  }

  if (!orderDetails) {
    return <div>Error loading order details</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto p-4 sm:p-6"
    >
      <Card className="p-4 sm:p-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl sm:text-3xl font-bold">
              {orderDetails.foodName}
            </motion.h1>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${orderDetails.type === "Veg" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span className="font-medium">{orderDetails.type}</span>
                </div>
                <p className="flex items-center gap-2 text-sm sm:text-base">Capacity: {orderDetails.capacity} people</p>
                <p className="flex items-center gap-2 text-sm sm:text-base">Quantity: {orderDetails.quantity} kg</p>
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  Created At: {new Date(orderDetails.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="h-64 w-full rounded-lg overflow-hidden">
                <img
                  src={`https://4da8-14-139-125-227.ngrok-free.app/${orderDetails.foodImage}` || "/placeholder.svg"}
                  alt={orderDetails.foodName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-full h-64">
              <Doughnut
                data={{
                  labels: ["Quantity", "Capacity"],
                  datasets: [
                    {
                      data: [orderDetails.quantity, orderDetails.capacity],
                      backgroundColor: ["#FF6384", "#36A2EB"],
                      hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (kg)</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity in kg"
                  min="1"
                  max={orderDetails.quantity.toString()}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={fetchItems} className="flex-1" disabled={!quantity}>
                  Continue
                </Button>
                <Button variant="destructive" onClick={() => router.back()} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Delivery Agents Modal */}
      <Dialog open={showDeliveryAgents} onOpenChange={setShowDeliveryAgents}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Delivery Agent</DialogTitle>
          </DialogHeader>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {items.map((item:any) => (
              <motion.div
                key={item?.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border cursor-pointer ${
                  selectedAgent === item.id ? "border-primary bg-primary/10" : ""
                }`}
                onClick={() => setSelectedAgent(item.id)}
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <Button onClick={handleConfirmOrder} disabled={!selectedAgent} className="w-full">
              Confirm Order
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Success Message Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-600">Order Successful!</DialogTitle>
          </DialogHeader>
          <p className="py-4">Your order has been placed successfully. Redirecting to dashboard...</p>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

