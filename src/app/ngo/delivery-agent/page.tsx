"use client"

import { useState, useEffect } from "react"
import { Plus, Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import APIservice from "@/api/api"

interface Agent {
  id: string
  name: string
  stars: number
  image: string
}

export default function DeliveryAgent() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [newAgent, setNewAgent] = useState({ name: "", image: "", password: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await APIservice.listDeliveryAgents()
        const fetchedAgents = response.data.map((agent: { name: string }, index: number) => ({
          id: (index + 1).toString(),
          name: agent.name,
          stars: 4,
          image: "/ngo/delivery-agent.jpg",
        }))
        setAgents(fetchedAgents)
      } catch (error) {
        console.error("Error fetching agents:", error)
      }
    }
    fetchAgents()
  }, [])

  const filteredAgents = agents.filter((agent) => agent.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddAgent = async () => {
    if (newAgent.name) {
      try {
        await APIservice.deliveryAgentAdd({ name: newAgent.name, password: newAgent.password })
        const newAgentData: Agent = {
          id: (agents.length + 1).toString(),
          name: newAgent.name,
          stars: 4,
          image: newAgent.image || "/ngo/delivery-agent.jpg",
        }
        setAgents([...agents, newAgentData])
        setNewAgent({ name: "", image: "", password: "" })
        setIsDialogOpen(false)
      } catch (error) {
        console.error("Error adding agent:", error)
      }
    }
  }

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Delivery Agent</h2>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-200 hover:bg-blue-300 text-blue-800">
              <Plus className="mr-2 h-4 w-4" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="password"
                  value={newAgent.password}
                  onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  value={newAgent.image}
                  onChange={(e) => setNewAgent({ ...newAgent, image: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>
            <Button onClick={handleAddAgent}>Add Agent</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-4 rounded-lg">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            className="pl-9 bg-gray-300 border-none"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mt-4 space-y-2">
          {filteredAgents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between border border-emerald-400 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={agent.image} alt={agent.name} />
                  <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <div className="flex items-center">
                    <span className="mr-1">{agent.stars} stars</span>⭐
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                onClick={() => handleDeleteAgent(agent.id)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

