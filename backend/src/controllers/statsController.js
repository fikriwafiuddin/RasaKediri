import Menu from "../models/menuModel.js"
import Order from "../models/orderModel.js"
import User from "../models/userModel.js"

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalOrders = await Order.countDocuments()
    const totalMenus = await Menu.countDocuments()
    const totalRevenueAgg = await Order.aggregate([
      { $match: { status: { $in: ["delivered"] } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    const totalRevenue = totalRevenueAgg[0]?.total || 0

    return res.status(200).json({
      message: "Succsess get stats",
      data: { stats: { totalUsers, totalOrders, totalMenus, totalRevenue } },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error", erros: {} })
  }
}

export const getTopMenus = async (req, res) => {
  try {
    const topMenus = await Menu.find().sort({ sold: -1 }).limit(4)
    return res
      .status(200)
      .json({ message: "Succsess get top menus", data: { topMenus } })
  } catch (error) {
    console.log("Error in getTopMenus", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const getLatestOrders = async (req, res) => {
  try {
    const latestOrders = await Order.find().sort({ createdAt: -1 }).limit(4)
    return res
      .status(200)
      .json({ message: "Succsess get laters orders", data: { latestOrders } })
  } catch (error) {
    console.log("Error in latersOrders", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
