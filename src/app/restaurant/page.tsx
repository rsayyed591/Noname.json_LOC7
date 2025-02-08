"use client"

import { BarChartComponent } from "@/components/restaurant/bar-chart"
import { LineChartComponent } from "@/components/restaurant/line-chart"
import { StatsCard } from "@/components/restaurant/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const acceptedOrders = [
  { title: "Today", value: "12" },
  { title: "This Week", value: "84" },
  { title: "This Month", value: "342" },
  { title: "Total", value: "1,274" },
]

const publishedOrders = [
  { title: "Active", value: "4" },
  { title: "Pending", value: "7" },
  { title: "Completed", value: "145" },
  { title: "Total", value: "156" },
]

export default function Restaurant() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-4">Accepted Orders</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {acceptedOrders.map((item) => (
              <StatsCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Published Orders</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {publishedOrders.map((item) => (
              <StatsCard key={item.title} {...item} />
            ))}
          </div>
        </div>

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
    </div>
  )
}
