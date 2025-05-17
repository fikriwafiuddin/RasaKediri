import express from "express"
import { validateRequest } from "../middlewares/validateRequest.js"
import { loginUserSchema, registerUserSchema } from "../schemas/userSchema.js"
import {
  getMe,
  loginUser,
  registerUser,
} from "../controllers/authController.js"
import verifyToken from "../middlewares/verifyToken.js"
import verifyUser from "../middlewares/verifyUser.js"

const route = express.Router()

route.post("/register", validateRequest(registerUserSchema), registerUser)
route.post("/login", validateRequest(loginUserSchema), loginUser)
route.get("/getMe", verifyToken, getMe)

export default route
