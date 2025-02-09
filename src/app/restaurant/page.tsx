"use client"
import { useState } from "react"
import { BarChartComponent } from "@/components/restaurant/bar-chart"
import { LineChartComponent } from "@/components/restaurant/line-chart"
import { StatsCard } from "@/components/restaurant/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample data for individual orders
const acceptedOrdersList = [
  { 
    id: 1,
    ngoName: "Food for All",
    items: ["Rice", "Vegetables", "Bread"],
    quantity: "25kg",
    acceptedAt: "2024-02-08T10:30:00",
    status: "In Progress",
    contactPerson: "John Doe",
    phone: "+1234567890"
  },
  {
    id: 2,
    ngoName: "Helping Hands",
    items: ["Fruits", "Dairy Products"],
    quantity: "15kg",
    acceptedAt: "2024-02-08T11:45:00",
    status: "Scheduled",
    contactPerson: "Jane Smith",
    phone: "+1234567891"
  }
]

const publishedOrdersList = [
  {
    id: 1,
    foodType: "Cooked Meals",
    items: ["Pasta", "Soup", "Salad"],
    quantity: "30 portions",
    publishedAt: "2024-02-08T09:00:00",
    expiryTime: "2024-02-08T18:00:00",
    status: "Active"
  },
  {
    id: 2,
    foodType: "Fresh Produce",
    items: ["Vegetables", "Fruits"],
    quantity: "20kg",
    publishedAt: "2024-02-08T08:30:00",
    expiryTime: "2024-02-09T08:30:00",
    status: "Active"
  }
]

// Combined order stats data
const orderStats = [
  { title: "Today's Orders", value: "12", category: "accepted" },
  { title: "Weekly Orders", value: "84", category: "accepted" },
  { title: "Monthly Orders", value: "342", category: "accepted" },
  { title: "Total Accepted", value: "1,274", category: "accepted" },
  { title: "Active Orders", value: "4", category: "published" },
  { title: "Pending Orders", value: "7", category: "published" },
  { title: "Completed Orders", value: "145", category: "published" },
  { title: "Total Published", value: "156", category: "published" }
]

// Wobble card component
import { ReactNode, MouseEventHandler } from "react";
import { AIAnalytics } from "@/components/restaurant/ai-analytics"

const WobbleCard = ({ children, onClick }: { children: ReactNode; onClick: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div 
      className="group relative flex rounded-lg border p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white"
      onClick={onClick}
      style={{
        animation: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.animation = "wobble 1s ease-in-out"
      }}
      onAnimationEnd={(e) => {
        e.currentTarget.style.animation = "none"
      }}
    >
      {children}
    </div>
  )
}

export default function Restaurant() {
  const [selectedOrder, setSelectedOrder] = useState<{ title: string; value: string; category: string } | null>(null)
  const [selectedAcceptedOrder, setSelectedAcceptedOrder] = useState<typeof acceptedOrdersList[0] | null>(null)
  const [selectedPublishedOrder, setSelectedPublishedOrder] = useState<typeof publishedOrdersList[0] | null>(null)

  const handleCardClick = (order: { title: string; value: string; category: string }) => {
    setSelectedOrder(order)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <style jsx global>{`
        @keyframes wobble {
          0% { transform: translateX(0%); }
          15% { transform: translateX(-2%) rotate(-1deg); }
          30% { transform: translateX(1.5%) rotate(1deg); }
          45% { transform: translateX(-1%) rotate(-0.5deg); }
          60% { transform: translateX(0.5%) rotate(0.25deg); }
          75% { transform: translateX(-0.25%) rotate(-0.1deg); }
          100% { transform: translateX(0%); }
        }
      `}</style>

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="space-y-4">
        {/* Accepted Orders List Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Accepted Orders</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {acceptedOrdersList.map((order) => (
              <WobbleCard key={order.id} onClick={() => setSelectedAcceptedOrder(order)}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{order.ngoName}</h4>
                    <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Items: {order.items.join(", ")}</p>
                  <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Accepted: {new Date(order.acceptedAt).toLocaleString()}
                  </p>
                </div>
              </WobbleCard>
            ))}
          </div>
        </div>

        {/* Published Orders List Section */}
        <div>
          <AIAnalytics />
        </div>
        {/* Order Stats Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Order Stats</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {orderStats.map((item) => (
              <StatsCard
                key={item.title}
                title={item.title}
                value={item.value}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Food Wasted Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChartComponent />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Monthly Donations</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChartComponent />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedOrder?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p><strong>Value:</strong> {selectedOrder?.value}</p>
            <p>
              <strong>Category:</strong> {selectedOrder?.category === 'accepted' ? 'Accepted Orders' : 'Published Orders'}
            </p>
            <p><strong>Details:</strong> More information about this order will be displayed here.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Accepted Order Modal */}
      <Dialog open={!!selectedAcceptedOrder} onOpenChange={() => setSelectedAcceptedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accepted Order Details</DialogTitle>
          </DialogHeader>
          {selectedAcceptedOrder && (
            <div className="space-y-4">
              <p><strong>NGO:</strong> {selectedAcceptedOrder.ngoName}</p>
              <p><strong>Items:</strong> {selectedAcceptedOrder.items.join(", ")}</p>
              <p><strong>Quantity:</strong> {selectedAcceptedOrder.quantity}</p>
              <p><strong>Status:</strong> {selectedAcceptedOrder.status}</p>
              <p><strong>Contact Person:</strong> {selectedAcceptedOrder.contactPerson}</p>
              <p><strong>Phone:</strong> {selectedAcceptedOrder.phone}</p>
              <p>
                <strong>Accepted At:</strong>{" "}
                {new Date(selectedAcceptedOrder.acceptedAt).toLocaleString()}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Published Order Modal */}
      <Dialog open={!!selectedPublishedOrder} onOpenChange={() => setSelectedPublishedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Published Order Details</DialogTitle>
          </DialogHeader>
          {selectedPublishedOrder && (
            <div className="space-y-4">
              <p><strong>Food Type:</strong> {selectedPublishedOrder.foodType}</p>
              <p><strong>Items:</strong> {selectedPublishedOrder.items.join(", ")}</p>
              <p><strong>Quantity:</strong> {selectedPublishedOrder.quantity}</p>
              <p><strong>Status:</strong> {selectedPublishedOrder.status}</p>
              <p>
                <strong>Published At:</strong>{" "}
                {new Date(selectedPublishedOrder.publishedAt).toLocaleString()}
              </p>
              <p>
                <strong>Expires At:</strong>{" "}
                {new Date(selectedPublishedOrder.expiryTime).toLocaleString()}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}