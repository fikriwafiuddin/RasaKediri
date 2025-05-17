import { ZodError } from "zod"
import cloudinary from "../utils/cloudinary.js"

export const validateRequest =
  (schema, requiredImage = false) =>
  async (req, res, next) => {
    const image = req.file
    try {
      const data = req.body || {}
      const params = req.params || {}
      schema.parse({ ...data, ...params })
      if (requiredImage && !image) {
        return res.status(400).json({
          message: "Invalid request",
          errors: { image: ["Image is required"] },
        })
      }
      next()
    } catch (error) {
      if (image) {
        await cloudinary.uploader.destroy(image.filename)
      }
      if (error instanceof ZodError) {
        const errors = error.flatten().fieldErrors
        if (requiredImage && !image) errors["image"] = ["Image is required"]
        return res.status(400).json({ message: "Invalid request", errors })
      }
      console.log("Error in validateRequest", error)
      return res
        .status(500)
        .json({ message: "Internal server error", errors: {} })
    }
  }
