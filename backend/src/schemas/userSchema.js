import { z } from "zod"

export const registerUserSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50, { message: "Name must be at most 50" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalid email" })
      .max(30, { message: "Email must be at most 30 characters" }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, { message: "Password must be at least 6 characters" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
      invalid_type_error: "Confirm Password must be a string",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email" })
    .max(30, { message: "Email must be at most 30 characters" }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
})
