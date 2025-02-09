"use client"

import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/admin/stats-card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// Dummy data
const deliveryData = [
  { date: "2024-01", ngos: 65, vendors: 45 },
  { date: "2024-02", ngos: 85, vendors: 55 },
  { date: "2024-03", ngos: 75, vendors: 60 },
  { date: "2024-04", ngos: 95, vendors: 70 },
  { date: "2024-05", ngos: 80, vendors: 65 },
  { date: "2024-06", ngos: 90, vendors: 75 },
];

const foodQuantityData = [
  { day: "Mon", quantity: 120 },
  { day: "Tue", quantity: 80 },
  { day: "Wed", quantity: 100 },
  { day: "Thu", quantity: 70 },
  { day: "Fri", quantity: 90 },
  { day: "Sat", quantity: 110 },
  { day: "Sun", quantity: 60 },
];

const foodTypeData = [
  { type: "Vegetables", percentage: 30 },
  { type: "Fruits", percentage: 25 },
  { type: "Grains", percentage: 20 },
  { type: "Dairy", percentage: 15 },
  { type: "Meat", percentage: 10 },
];

const busyDays = [
  new Date(2024, 1, 5),
  new Date(2024, 1, 12),
  new Date(2024, 1, 19),
  new Date(2024, 1, 26),
  new Date(2024, 2, 4),
  new Date(2024, 2, 11),
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("2024-06");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const lineChartData = {
    labels: deliveryData.map((item) => item.date),
    datasets: [
      {
        label: "NGOs",
        data: deliveryData.map((item) => item.ngos),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
      {
        label: "Food Vendors",
        data: deliveryData.map((item) => item.vendors),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
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

  const pieChartData = {
    labels: foodTypeData.map((item) => item.type),
    datasets: [
      {
        data: foodTypeData.map((item) => item.percentage),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };

  return (
    <div className="flex-1 space-y-6 p-2 md:p-4 lg:p-6">
      <div className="space-y-4 md:space-y-0">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Admin Dashboard</h2>
      </div>

      <motion.div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatsCard title="Total Food Vendors" value="142" className="w-full" />
        <StatsCard title="Total NGOs Registered" value="89" className="w-full" />
        <StatsCard title="Total Meals Donated" value="12,450" className="w-full" />
        <StatsCard title="Total Food Saved (kg)" value="3,200" className="w-full" />
      </motion.div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>NGOs and Food Vendors Growth</CardTitle>
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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Food Type Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Busiest Days for NGO Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Select
                  value={selectedMonth}
                  onValueChange={(value) => setSelectedMonth(value)}
                >
                  <SelectTrigger className="w-[180px] mb-4">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-01">January 2024</SelectItem>
                    <SelectItem value="2024-02">February 2024</SelectItem>
                    <SelectItem value="2024-03">March 2024</SelectItem>
                    <SelectItem value="2024-04">April 2024</SelectItem>
                    <SelectItem value="2024-05">May 2024</SelectItem>
                    <SelectItem value="2024-06">June 2024</SelectItem>
                  </SelectContent>
                </Select>
                <Calendar
                  mode="single"
                  selected={busyDays[0]}
                  className="rounded-md border"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
