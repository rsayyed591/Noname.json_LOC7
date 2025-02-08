"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FileUpload from "@/components/ui/FileUpload"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  isRestaurant: z.boolean(),
  isNGO: z.boolean(),
  restaurantName: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  type: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  FASSAI: z.any().optional(),
  PANCARD: z.any().optional(),
  DARPAN: z.any().optional(),
  gstin: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function Page() {
  const [isRestaurant, setIsRestaurant] = useState(false)
  const [isNGO, setIsNGO] = useState(true)
  const [step, setStep] = useState(1)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isRestaurant: false,
      isNGO: true,
      restaurantName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      type: "",
      FASSAI: null,
      PANCARD: null,
      DARPAN: null,
      gstin: "",
    },
  })

  function onSubmit(values: FormValues) {
    const concatenatedAddress = `${values.address1 || ""} ${values.address2 || ""}`.trim()
    const role = isRestaurant ? "Restaurant" : "NGO"

    const { address1, address2, ...restValues } = values
    const modifiedValues = {
      ...restValues,
      address: concatenatedAddress,
      role: role,
    }

    console.log(modifiedValues)
  }

  const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8"
      >
        {isRestaurant ? "Sign Up as Restaurant" : "Sign Up"}
      </motion.h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...fadeInOut}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="button" className="w-full mt-4 bg-teal-200 hover:bg-teal-300" onClick={() => setStep(2)}>
                    Continue
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" {...fadeInOut}>
                {isNGO && (
                  <FormField
                    control={form.control}
                    name="DARPAN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DARPAN</FormLabel>
                        <FormControl>
                          <FileUpload onFileSelect={(file:any) => field.onChange(file)} label="Upload DARPAN document" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="PANCARD"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PANCARD</FormLabel>
                      <FormControl>
                        <FileUpload onFileSelect={(file:any) => field.onChange(file)} label="Upload PANCARD document" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isRestaurant && (
                  <>
                    <FormField
                      control={form.control}
                      name="restaurantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Restaurant Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gstin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GSTIN Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select>
                              <SelectTrigger className="w-full mt-4">
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="veg">VEG</SelectItem>
                                <SelectItem value="nonveg">NONVEG</SelectItem>
                                <SelectItem value="jain">JAIN</SelectItem>
                                <SelectItem value="all">ALL</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="FASSAI"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>FSSAI Card</FormLabel>
                          <FormControl>
                            <FileUpload onFileSelect={(file:any) => field.onChange(file)} label="Upload FSSAI Card" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {isNGO && (
                  <>
                    <FormField
                      control={form.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" className="w-full mt-4 bg-teal-200 hover:bg-teal-300">
                    Sign Up
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center space-x-2">
              <Switch
                id="restaurant-mode"
                checked={isRestaurant}
                onCheckedChange={(checked) => {
                  setIsRestaurant(checked)
                  setIsNGO(!checked)
                  form.setValue("isRestaurant", checked)
                  form.setValue("isNGO", !checked)
                }}
              />
              <label htmlFor="restaurant-mode">{isRestaurant ? "←" : "Want to donate food?"}</label>
            </div>
          </motion.div>
        </form>
      </Form>
    </div>
  )
}

