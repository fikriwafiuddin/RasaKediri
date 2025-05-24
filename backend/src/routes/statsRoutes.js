import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import verifyAdmin from "../middlewares/varifyAdmin.js"
import {
  getLatestOrders,
  getStats,
  getTopMenus,
} from "../controllers/statsController.js"

const route = express.Router()

route.get("/getStats", verifyToken, verifyAdmin, getStats)
route.get("/getTopMenus", verifyToken, verifyAdmin, getTopMenus)
route.get("/getLatestOrders", verifyToken, verifyAdmin, getLatestOrders)

export default route
