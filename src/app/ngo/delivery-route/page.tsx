"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const deliveryAgents = [
  {
    email: "agent1@example.com",
    password: "password123",
    origin: { lat: 18.9526, lon: 72.8209 },
    destination: { lat: 19.0760, lon: 72.8777 }
  },
  {
    email: "agent2@example.com",
    password: "password456",
    origin: { lat: 19.0760, lon: 72.8777 },
    destination: { lat: 19.2183, lon: 72.9781 }
  },
  {
    email: "agent3@example.com",
    password: "password789",
    origin: { lat: 19.2183, lon: 72.9781 },
    destination: { lat: 19.0421, lon: 72.8666 }
  },
  {
    email: "agent4@example.com",
    password: "password101",
    origin: { lat: 19.0421, lon: 72.8666 },
    destination: { lat: 18.9526, lon: 72.8209 }
  }
];

const OrderTracking: React.FC = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [mapUrl, setMapUrl] = useState("");

  const handleSignup = () => {
    const agent = deliveryAgents.find(
      (agent) => agent.email === user.email && agent.password === user.password
    );
    if (agent) {
      setMapUrl(`https://www.google.com/maps/dir/?api=1&origin=${agent.origin.lat},${agent.origin.lon}&destination=${agent.destination.lat},${agent.destination.lon}&travelmode=driving`);
      setSignedUp(true);
    }
  };

  if (!signedUp) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <h1 className="text-3xl font-bold mb-4">Verify delivery agent</h1>
        <Input
          type="email"
          placeholder="Email"
          className="mb-2 p-2 w-80 border rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 w-80 border rounded"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button onClick={handleSignup} className="w-80">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-[600px]"
      >
        <Button className="w-full">Open Google Maps</Button>
      </a>
    </div>
  );
};

export default OrderTracking;
