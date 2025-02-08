"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RestaurantDetailsSkeleton } from "@/components/ngo/restaurant-skeleton"
import confetti from "canvas-confetti"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js"
import { Star, MapPin } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { Doughnut } from "react-chartjs-2"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { Card } from "@/components/ui/card"

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

const restaurantDetails = [
  {
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
      imageUrl: "/ngo/mixedveg.jpg",
      description: "Fresh vegetables from today's stock",
    },
  },
  {
    id: "2",
    name: "Nishi Restaurant",
    foodType: "non-veg",
    location: {
      latitude: 19.0760,
      longitude: 72.8777,
    },
    fssai: "approved",
    address: "20, MG Road, Andheri East, Mumbai, Maharashtra",
    stars: 4,
    reviews: {
      public: {
        positive: 60,
        negative: 40,
      },
      food: {
        veryGood: 35,
        good: 25,
        average: 20,
        bad: 20,
      },
    },
    foodDetails: {
      foodName: "Chicken Biryani",
      quantity: "15kg",
      peopleCount: 15,
      rating: "very good",
      aiQuality: "Well-cooked and flavorful",
      imageUrl: "/ngo/biryani.jpg",
      description: "Delicious chicken biryani with aromatic spices",
    },
  },
]

const foodSentimentData = [
  { name: "Very Good", value: 45 },
  { name: "Good", value: 30 },
  { name: "Average", value: 15 },
  { name: "Bad", value: 10 },
]

export default function OrderDetails() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showFoodDetails, setShowFoodDetails] = useState(false)
  const [showDeliveryAgents, setShowDeliveryAgents] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [quantity, setQuantity] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
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
      <Card className="p-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl sm:text-3xl font-bold">
              {restaurantDetails[0].name}
            </motion.h1>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    restaurantDetails[0].foodType === 'veg' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="font-medium">{restaurantDetails[0].foodType.toUpperCase()}</span>
              </div>
              <p className="flex items-center gap-2 text-sm sm:text-base">
                FSSAI: <span className="text-green-600 font-medium">{restaurantDetails[0].fssai.toUpperCase()}</span>
              </p>
              <p className="flex items-start gap-2 text-sm sm:text-base">
                <MapPin className="mt-1 shrink-0" />
                <span>{restaurantDetails[0].address}</span>
              </p>
              <p className="flex items-center gap-2 text-sm sm:text-base">
                Stars: {restaurantDetails[0].stars}{' '}
                <span className="text-yellow-500">{'⭐'.repeat(restaurantDetails[0].stars)}</span>
              </p>
              <div className="h-64 w-full rounded-lg overflow-hidden">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat: restaurantDetails[0].location.latitude, lng: restaurantDetails[0].location.longitude }}
                    zoom={14}
                  >
                    <Marker position={{ lat: restaurantDetails[0].location.latitude, lng: restaurantDetails[0].location.longitude }} />
                  </GoogleMap>
                ) : (
                  <div className="w-full h-full bg-gray-100 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold">Public Sentiment</h2>
              <div className="h-48">
                <Doughnut
                  data={{
                    labels: ['Positive', 'Negative'],
                    datasets: [{
                      data: [restaurantDetails[0].reviews.public.positive, restaurantDetails[0].reviews.public.negative],
                      backgroundColor: ['#22c55e', '#ef4444'],
                    }],
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold">Food Sentiment</h2>
              <div className="h-48">
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
        <Button variant="link" onClick={() => setShowFoodDetails(true)} className="text-blue-600 hover:text-blue-800">
          Check Food Details
        </Button>
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
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setShowDeliveryAgents(true)} className="flex-1" disabled={!quantity}>
              Continue
            </Button>
            <Button variant="destructive" onClick={() => router.back()} className="flex-1">
              Cancel
            </Button>
            </div>
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
            <Image
              src={restaurantDetails[0].foodDetails.imageUrl || "/placeholder.svg"}
              alt={restaurantDetails[0].foodDetails.foodName}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold">{restaurantDetails[0].foodDetails.foodName}</h3>
            <p>
              <span className="font-semibold">Quantity:</span> {restaurantDetails[0].foodDetails.quantity}
            </p>
            <p>
              <span className="font-semibold">Serves:</span> {restaurantDetails[0].foodDetails.peopleCount} people
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {restaurantDetails[0].foodDetails.rating}
            </p>
            <p>
              <span className="font-semibold">AI Quality:</span> {restaurantDetails[0].foodDetails.aiQuality}
            </p>
            <p>{restaurantDetails[0].foodDetails.description}</p>
          </motion.div>
        </DialogContent>
      </Dialog>

      
      {/* Updated Delivery Agents Modal */}
      <Dialog open={showDeliveryAgents} onOpenChange={setShowDeliveryAgents}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Delivery Agent</DialogTitle>
          </DialogHeader>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {agentsData.agents.map((agent) => (
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
                  <Avatar>
                    <AvatarImage src={agent.image} alt={agent.name} />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{agent.stars}</span>
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

