import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import verifyAdmin from "../middlewares/varifyAdmin.js"
import { getUsers } from "../controllers/userController.js"

const route = express.Router()

route.get("/getUsers", verifyToken, verifyAdmin, getUsers)

export default route
