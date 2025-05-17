import { z } from "zod"

export const addcartSchema = z.object({
  id: z
    .string({
      required_error: "id is required",
      invalid_type_error: "id must be a string",
    })
    .length(24, "id must be 24 characters long"),
  quantity: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({
        required_error: "quantity is required",
        invalid_type_error: "quantity must be a number",
      })
      .positive({ message: "quantity must be a positive number" })
  ),
})

export const updateCartSchema = z.object({
  id: z
    .string({
      required_error: "id is required",
      invalid_type_error: "id must be a string",
    })
    .length(24, "id must be 24 characters long"),
  quantity: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({
        required_error: "quantity is required",
        invalid_type_error: "quantity must be a number",
      })
      .nonnegative({ message: "quantity must be a non-negative number" })
  ),
})
