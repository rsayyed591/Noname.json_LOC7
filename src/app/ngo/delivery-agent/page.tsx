"use client"

import { useEffect, useState } from "react"


export default function DeliveryAgent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex-1 space-y-4 p-2 md:p-4 lg:p-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Delivery Agent</h2>
      </div>
    </div>
  )
}
