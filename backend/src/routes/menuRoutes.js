import express from "express"
import {
  addMenu,
  deleteMenu,
  getMenus,
  updateMenu,
} from "../controllers/menuController.js"
import verifyToken from "../middlewares/verifyToken.js"
import verifyAdmin from "../middlewares/varifyAdmin.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import { menuSchema } from "../schemas/menuSchema.js"
import uploadFile from "../middlewares/uploadeFile.js"

const route = express.Router()

route.get("/getMenus", getMenus)
route.post(
  "/addMenu",
  verifyToken,
  verifyAdmin,
  uploadFile,
  validateRequest(menuSchema, true),
  addMenu
)
route.patch(
  "/updateMenu/:menuId",
  verifyToken,
  verifyAdmin,
  uploadFile,
  validateRequest(menuSchema),
  updateMenu
)
route.delete("/deleteMenu/:menuId", verifyToken, verifyAdmin, deleteMenu)

export default route
