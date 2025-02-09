"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Sandwich, Wheat } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import APIservice from "@/api/api";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  donateFormSchema,
  type DonateFormValues,
} from "@/lib/schemas/donate-food-schema";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { HoverEffect } from "@/components/ui/hover-effect"; // Optional: For hover effects

export default function DonateFoodPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<DonateFormValues>({
    resolver: zodResolver(donateFormSchema),
    defaultValues: {
      foodName: "",
      quantity: "",
      peopleCount: "",
      foodType: "veg",
    },
  });

  async function onSubmit(data: DonateFormValues) {
    const formData = new FormData();
    formData.append("food_name", data.foodName);
    formData.append("food_quantity", data.quantity);
    formData.append("no_of_people", data.peopleCount);
    formData.append("food_type", data.foodType);

    const foodImage = form.getValues("foodImage");
    if (foodImage) {
      formData.append("food_image", foodImage);
    }

    //also hit the gemini api endpoint in the api/donate-food route with the image
    const response = await fetch("http://localhost:3000/api/food-hygine", {
      method: "POST",
      body: formData,
    });
    console.log(response)

    const response2 = await APIservice.foodDonationAdd(formData);
    router.push("/restaurant")
    console.log(response2.data);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("foodImage", file);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 mx-auto max-w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Donate Food</CardTitle>
            <CardDescription className="text-lg">
              Help reduce food waste by donating surplus food. Fill out the form
              below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="foodName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Food Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter food name"
                              {...field}
                              className="text-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Quantity</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter quantity"
                                {...field}
                                className="text-lg"
                              />
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
                            <FormLabel className="text-lg">
                              No. of People
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter number"
                                {...field}
                                className="text-lg"
                              />
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
                          <FormLabel className="text-lg">
                            Type of Food
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
                            >
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem
                                    value="veg"
                                    className="h-6 w-6"
                                  />
                                </FormControl>
                                <FormLabel className="flex items-center space-x-2 text-lg">
                                  <Leaf className="h-5 w-5 text-green-500" />
                                  <span>Veg</span>
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem
                                    value="nonveg"
                                    className="h-6 w-6"
                                  />
                                </FormControl>
                                <FormLabel className="flex items-center space-x-2 text-lg">
                                  <Sandwich className="h-5 w-5 text-red-500" />
                                  <span>Non-veg</span>
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem
                                    value="jain"
                                    className="h-6 w-6"
                                  />
                                </FormControl>
                                <FormLabel className="flex items-center space-x-2 text-lg">
                                  <Wheat className="h-5 w-5 text-yellow-500" />
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

                  <div className="space-y-6">
                    <FormLabel className="text-lg">Food Image</FormLabel>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 h-[300px] bg-gray-50 hover:bg-gray-100 transition-colors">
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imagePreview || "/placeholder.svg"}
                            alt="Food preview"
                            fill
                            className="object-cover rounded-lg"
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
                          <label
                            htmlFor="food-image"
                            className="cursor-pointer text-blue-500 hover:text-blue-600 text-lg"
                          >
                            Click to upload image
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full text-lg py-6">
                  Submit Donation
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
