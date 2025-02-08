"use client"

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ngo/stats-card";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

type OrderStatus = "Incomplete" | "In Progress" | "Completed";

const status: OrderStatus = "In Progress";

const deliveryData = [
  { date: "2024-01", deliveries: 65 },
  { date: "2024-02", deliveries: 85 },
  { date: "2024-03", deliveries: 75 },
  { date: "2024-04", deliveries: 95 },
];

const foodQuantityData = [
  { day: "Mon", quantity: 120 },
  { day: "Tue", quantity: 80 },
  { day: "Wed", quantity: 100 },
  { day: "Thu", quantity: 70 },
  { day: "Fri", quantity: 90 },
];

const lineChartData = {
  labels: deliveryData.map((item) => item.date),
  datasets: [
    {
      label: "Deliveries",
      data: deliveryData.map((item) => item.deliveries),
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
    },
  ],
};

const barChartData = {
  labels: foodQuantityData.map((item) => item.day),
  datasets: [
    {
      label: "Food Quantity",
      data: foodQuantityData.map((item) => item.quantity),
      backgroundColor: "#3b82f6",
    },
  ],
};

export default function NGO() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex-1 space-y-6 p-2 md:p-4 lg:p-6">
      <div className="space-y-4 md:space-y-0">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Dashboard</h2>
      </div>

      <motion.div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatsCard title="Restaurants Available" value="25" className="w-full" />
        <StatsCard title="Previous Orders" value="142" className="w-full" />
        <StatsCard title="Current Order Restaurant" value="Food Palace" className="w-full" />
        <StatsCard 
          title="Current Order Status" 
          value={
            <span className={
              status === "Incomplete" ? "text-red-500" :
              status === "In Progress" ? "text-yellow-500" :
              status === "Completed" ? "text-green-500" :
              "text-gray-500"
            }>
              {status}
            </span>
          }
          className="w-full"
        />
      </motion.div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>No. of Deliveries</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Food Quantity per Day</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
