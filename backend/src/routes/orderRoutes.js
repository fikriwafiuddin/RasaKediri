import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import verifyUser from "../middlewares/verifyUser.js"
import verifyAdmin from "../middlewares/varifyAdmin.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import { orderSchema } from "../schemas/orderSchema.js"
import {
  createOrder,
  getMyOrders,
  getOrders,
  changeStatusOrder,
} from "../controllers/orderController.js"

const route = express.Router()

route.post(
  "/createOrder",
  verifyToken,
  verifyUser,
  validateRequest(orderSchema),
  createOrder
)
route.get("/getOrders", verifyToken, verifyAdmin, getOrders)
route.get("/getMyOrders", verifyToken, verifyUser, getMyOrders)
route.patch(
  "/changeOrderStatus/:id",
  verifyToken,
  verifyAdmin,
  changeStatusOrder
)

export default route
