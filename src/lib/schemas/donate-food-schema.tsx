import { z } from "zod"

export const donateFormSchema = z.object({
  foodName: z.string().min(2, "Food name must be at least 2 characters"),
  quantity: z.string().min(1, "Quantity is required"),
  peopleCount: z.string().min(1, "Number of people is required"),
  foodType: z.enum(["veg", "nonveg", "jain"], {
    required_error: "Please select a food type",
  }),
  foodImage: z.any().optional(),
})

export type DonateFormValues = z.infer<typeof donateFormSchema>

