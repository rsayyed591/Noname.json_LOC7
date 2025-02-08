"use client"

import { useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { Leaf, Sandwich, Wheat } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { donateFormSchema, type DonateFormValues } from "@/lib/schemas/donate-food-schema"

export default function DonateFoodPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<DonateFormValues>({
    resolver: zodResolver(donateFormSchema),
    defaultValues: {
      foodName: "",
      quantity: "",
      peopleCount: "",
      foodType: "veg",
    },
  })

  async function onSubmit(data: DonateFormValues) {
    const formData = new FormData();
    formData.append("foodName", data.foodName);
    formData.append("quantity", data.quantity);
    formData.append("peopleCount", data.peopleCount);
    formData.append("foodType", data.foodType);
  
    const foodImage = form.getValues("foodImage");
    if (foodImage) {
      formData.append("foodImage", foodImage);
    }
  
    await fetch("/api/donate-food", {
      method: "POST",
      body: formData,
    });
  
    console.log(data);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue("foodImage", file)
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>Fill the Food Available Form</CardTitle>
          <CardDescription>Please provide details about the food you wish to donate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="foodName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter food name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter quantity" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="peopleCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of People</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="foodType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Food</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="veg" />
                              </FormControl>
                              <FormLabel className="flex items-center space-x-2">
                                <Leaf className="h-4 w-4 text-green-500" />
                                <span>Veg</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="nonveg" />
                              </FormControl>
                              <FormLabel className="flex items-center space-x-2">
                                <Sandwich className="h-4 w-4 text-red-500" />
                                <span>Non-veg</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="jain" />
                              </FormControl>
                              <FormLabel className="flex items-center space-x-2">
                                <Wheat className="h-4 w-4 text-yellow-500" />
                                <span>Jain</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormLabel>Food Image</FormLabel>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 h-[300px]">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Food preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="food-image"
                        />
                        <label htmlFor="food-image" className="cursor-pointer text-blue-500 hover:text-blue-600">
                          Click to upload image
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit Donation
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

