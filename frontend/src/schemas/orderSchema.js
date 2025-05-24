import { z } from "zod"

export const orderSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      empty_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters")
    .max(40, "Name must be at most 40 characters"),
  email: z
    .string({
      required_error: "Email is required",
      empty_error: "Email is required",
    })
    .email({ message: "Invalid email" }),
  phone: z
    .string({
      required_error: "Phone is required",
      empty_error: "Phone is required",
    })
    .length(12, "Phone must be 12 digits"),
  address: z
    .string({
      required_error: "Address is required",
      empty_error: "Address is required",
    })
    .min(10, "Address must be at least 10 characters")
    .max(100, "Address must be at most 100 characters"),
  notes: z.string().optional(),
})
