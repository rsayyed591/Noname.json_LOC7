"use client"

import { useQuery } from "@tanstack/react-query"
import { Bot } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchAIAnalytics } from "@/lib/service/analytics"

export function AIAnalytics() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ai-analytics"],
    queryFn: fetchAIAnalytics,
  })

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI-Powered Wastage Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        ) : isError ? (
          <div className="text-muted-foreground">Unable to load AI analytics. Please try again later.</div>
        ) : (
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{data}</p>
        )}
      </CardContent>
    </Card>
  )
}

