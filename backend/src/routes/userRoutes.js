import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import verifyAdmin from "../middlewares/varifyAdmin.js"
import { getUserByName, getUsers } from "../controllers/userController.js"

const route = express.Router()

route.get("/getUsers", verifyToken, verifyAdmin, getUsers)
route.get("/getUserByName/:name", verifyToken, verifyAdmin, getUserByName)

export default route
