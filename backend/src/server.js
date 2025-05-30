import express from "express"
import "dotenv/config"
import connectDB from "./utils/connectDB.js"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import menuRoutes from "./routes/menuRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import StatsRoutes from "./routes/statsRoutes.js"

const app = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use("/auth", authRoutes)
app.use("/menu", menuRoutes)
app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)
app.use("/user", userRoutes)
app.use("/stats", StatsRoutes)
app.all(/.*/, (req, res) =>
  res.status(404).json({ message: "Route not found", errors: {} })
)

app.listen(port, () => console.log("Server is running on port", port))
