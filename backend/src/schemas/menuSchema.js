import { z } from "zod"

export const menuSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .positive({ message: "Price must be a positive number" })
  ),
  category: z.enum(["food", "beverage"], {
    required_error: "Category is required",
    invalid_type_error: "Category must be one of the following: food, beverage",
  }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(5, "Description must be at least 5 characters")
    .max(100, "Description must be at most 100 characters"),
})
