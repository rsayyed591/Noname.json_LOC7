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

  const formatAnalysis = (analysis: string) => {
    return analysis.split("\n").map((line, index) => {
      if (line.startsWith("*")) {
        return (
          <h3 key={index} className="font-bold mt-4 mb-2">
            {line.substring(1)}
          </h3>
        )
      } else if (line.startsWith(" *")) {
        return (
          <h4 key={index} className="font-semibold mt-3 mb-1">
            {line.substring(2)}
          </h4>
        )
      } else if (
        line.startsWith("\t+") ||
        line.startsWith("\t1.") ||
        line.startsWith("\t2.") ||
        line.startsWith("\t3.")
      ) {
        return (
          <li key={index} className="ml-6">
            {line.substring(2)}
          </li>
        )
      } else {
        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        )
      }
    })
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI-Powered Analytics
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
          <div className="text-sm leading-relaxed">{data ? formatAnalysis(data.analysis) : "No data available"}</div>
        )}
      </CardContent>
    </Card>
  )
}

