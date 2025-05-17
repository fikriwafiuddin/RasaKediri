import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import verifyUser from "../middlewares/verifyUser.js"
import {
  addMenuToCart,
  getCart,
  updateMenuCart,
} from "../controllers/cartController.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import { addcartSchema, updateCartSchema } from "../schemas/cartSchema.js"

const route = express.Router()

route.get("/getCart", verifyToken, verifyUser, getCart)
route.post(
  "/addMenuToCart",
  verifyToken,
  verifyUser,
  validateRequest(addcartSchema),
  addMenuToCart
)
route.patch(
  "/updateMenuCart",
  verifyToken,
  verifyUser,
  validateRequest(updateCartSchema),
  updateMenuCart
)

export default route
