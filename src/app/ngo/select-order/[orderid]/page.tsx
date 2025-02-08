"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RestaurantDetailsSkeleton } from "@/components/ngo/restaurant-skeleton"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import confetti from "canvas-confetti"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js"
import { User2, Star, MapPin } from "lucide-react"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

// Sample data - replace with API call
const restaurantDetails = {
  id: "1",
  name: "Vivek Restaurant",
  foodType: "veg",
  location: {
    latitude: 18.96712937931117,
    longitude: 72.82848240827201,
  },
  fssai: "approved",
  address: "15, LG Road, Vileparle West, Mumbai, Maharashtra",
  stars: 5,
  reviews: {
    public: {
      positive: 75,
      negative: 25,
    },
    food: {
      veryGood: 45,
      good: 30,
      average: 15,
      bad: 10,
    },
  },
  foodDetails: {
    foodName: "Mixed Vegetables",
    quantity: "10kg",
    peopleCount: 10,
    rating: "excellent",
    aiQuality: "Fresh and well-preserved",
    imageUrl: "/placeholder.svg",
    description: "Fresh vegetables from today's stock",
  },
}

const deliveryAgents = [
  { id: "1", name: "John Doe", rating: 4.5, avatar: "/placeholder.svg" },
  { id: "2", name: "Jane Smith", rating: 4.8, avatar: "/placeholder.svg" },
]

const foodSentimentData = [
  { name: "Very Good", value: 45 },
  { name: "Good", value: 30 },
  { name: "Average", value: 15 },
  { name: "Bad", value: 10 },
]

export default function OrderDetails() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showFoodDetails, setShowFoodDetails] = useState(false)
  const [showDeliveryAgents, setShowDeliveryAgents] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1500)
  }, [])

  const handleConfirmOrder = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    setShowDeliveryAgents(false)
  }

  if (loading) {
    return <RestaurantDetailsSkeleton />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto p-6"
    >
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Restaurant Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold">
              {restaurantDetails.name}
            </motion.h1>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    restaurantDetails.foodType === "veg" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="font-medium">{restaurantDetails.foodType.toUpperCase()}</span>
              </div>

              <p className="flex items-center gap-2">
                FSSAI: <span className="text-green-600 font-medium">{restaurantDetails.fssai.toUpperCase()}</span>
              </p>

              <p className="flex items-start gap-2">
                <MapPin className="mt-1 shrink-0" />
                <span>{restaurantDetails.address}</span>
              </p>

              <p className="flex items-center gap-2">
                Stars: {restaurantDetails.stars}{" "}
                <span className="text-yellow-500">{"⭐".repeat(restaurantDetails.stars)}</span>
              </p>

              {/* Map */}
              <div className="h-[300px] rounded-lg overflow-hidden">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={{ lat: restaurantDetails.location.latitude, lng: restaurantDetails.location.longitude }}
                    zoom={14}
                  >
                    <Marker
                      position={{ lat: restaurantDetails.location.latitude, lng: restaurantDetails.location.longitude }}
                    />
                  </GoogleMap>
                ) : (
                  <div className="w-full h-full bg-gray-100 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* Reviews and Charts */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Public Sentiment</h2>
              <div className="h-[200px]">
                <Doughnut
                  data={{
                    labels: ["Positive", "Negative"],
                    datasets: [
                      {
                        data: [restaurantDetails.reviews.public.positive, restaurantDetails.reviews.public.negative],
                        backgroundColor: ["#22c55e", "#ef4444"],
                      },
                    ],
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Food Sentiment</h2>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={foodSentimentData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="link"
                onClick={() => setShowFoodDetails(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Check Food Details
              </Button>
              <div className="flex gap-4">
                <Button onClick={() => setShowDeliveryAgents(true)} className="flex-1">
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

      {/* Food Details Modal */}
      <Dialog open={showFoodDetails} onOpenChange={setShowFoodDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Food Details</DialogTitle>
          </DialogHeader>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <img
              src={restaurantDetails.foodDetails.imageUrl || "/placeholder.svg"}
              alt={restaurantDetails.foodDetails.foodName}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold">{restaurantDetails.foodDetails.foodName}</h3>
            <p>
              <span className="font-semibold">Quantity:</span> {restaurantDetails.foodDetails.quantity}
            </p>
            <p>
              <span className="font-semibold">Serves:</span> {restaurantDetails.foodDetails.peopleCount} people
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {restaurantDetails.foodDetails.rating}
            </p>
            <p>
              <span className="font-semibold">AI Quality:</span> {restaurantDetails.foodDetails.aiQuality}
            </p>
            <p>{restaurantDetails.foodDetails.description}</p>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Delivery Agents Modal */}
      <Dialog open={showDeliveryAgents} onOpenChange={setShowDeliveryAgents}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Delivery Agent</DialogTitle>
          </DialogHeader>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {deliveryAgents.map((agent) => (
              <motion.div
                key={agent.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border cursor-pointer ${
                  selectedAgent === agent.id ? "border-primary bg-primary/10" : ""
                }`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <User2 className="w-10 h-10 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{agent.rating}</span>
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
    </motion.div>
  )
}

