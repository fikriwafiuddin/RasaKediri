import mongoose from "mongoose"
import Cart from "../models/cartModel.js"
import Menu from "../models/menuModel.js"
import Order from "../models/orderModel.js"

export const createOrder = async (req, res) => {
  const { name, email, phone, address, notes } = req.body
  const user = req.user
  try {
    const cart = await Cart.findOne({ user: user._id }).populate(
      "menuItems.menu"
    )
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", errors: {} })
    }

    if (cart.menuItems.length === 0) {
      return res.status(404).json({ message: "Cart is empty", errors: {} })
    }

    let amount = 0
    const orderItems = cart.menuItems.map((value) => {
      amount += value.menu.price * value.quantity
      return {
        menu: value.menu._id,
        quantity: value.quantity,
      }
    })
    const order = await Order.create({
      user: user._id,
      name,
      email,
      phone,
      address,
      notes,
      orderItems,
      amount,
    })

    await Cart.findByIdAndDelete(cart._id)

    await order.populate("orderItems.menu")
    return res
      .status(201)
      .json({ message: "Order created successfully", data: { order } })
  } catch (error) {
    console.log("Error in createOrder", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const getOrders = async (req, res) => {
  const status = req.query?.status
  try {
    let orders
    if (status) {
      orders = await Order.find({ status }).populate("orderItems.menu")
    } else {
      orders = await Order.find().populate("orderItems.menu")
    }
    return res
      .status(200)
      .json({ message: "Orders retrieved successfully", data: { orders } })
  } catch (error) {
    console.log("Error in getOrders", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const getMyOrders = async (req, res) => {
  const user = req.user
  try {
    const orders = await Order.find({ user: user._id }).populate(
      "orderItems.menu"
    )
    return res
      .status(200)
      .json({ message: "Orders retrieved successfully", data: { orders } })
  } catch (error) {
    console.log("Error in getMyOrders", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const changeStatusOrder = async (req, res) => {
  const id = req.params.id
  const newStatus = req.body?.status

  try {
    if (!newStatus) {
      return res.status(400).json({
        message: "Status is required",
        errors: { status: "Status is required" },
      })
    }

    const order = await Order.findById(id).populate("orderItems.menu")

    if (!order) {
      return res.status(404).json({ message: "Order not found", errors: {} })
    }

    // Cek apakah status saat ini sudah final
    if (["delivered", "cancelled"].includes(order.status)) {
      return res.status(400).json({
        message: `Cannot update status. Order is already marked as '${order.status}'.`,
        errors: { status: "Order is already marked as final" },
      })
    }

    // Update status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    ).populate("orderItems.menu")

    // Jika status baru adalah 'delivered', update sold
    if (newStatus === "delivered") {
      for (const item of updatedOrder.orderItems) {
        await Menu.findByIdAndUpdate(item.menu._id, {
          $inc: { sold: item.quantity },
        })
      }
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      data: { order: updatedOrder },
    })
  } catch (error) {
    console.error("Error in changeStatusOrder:", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const deleteOrder = async (req, res) => {
  const id = req.params?.id
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "ID is required", errors: { id: "ID is required" } })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid ID", errors: { id: "Invalid ID" } })
    }

    const order = await Order.findById(id)
    if (!order) {
      return res.status(404).json({ message: "Order not found", errors: {} })
    }

    if (["delivered", "cancelled"].includes(order.status)) {
      return res
        .status(400)
        .json({ message: "Cannot delete final order", errors: {} })
    }

    await Order.findByIdAndDelete(id)
    return res
      .status(200)
      .json({ message: "Order deleted successfully", data: { order } })
  } catch (error) {
    console.error("Error in deleteOrder:", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const searchOrderById = async (req, res) => {
  const id = req.query?.id
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "ID is required", errors: { id: ["ID is required"] } })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID",
        errors: { id: ["Invalid ID"] },
      })
    }

    const order = await Order.findById(id).populate("orderItems.menu")
    if (!order) {
      return res.status(404).json({ message: "Order not found", errors: {} })
    }

    return res
      .status(200)
      .json({ message: "Order retrieved successfully", data: { order } })
  } catch (error) {
    console.log("Error in handleSearchOrderById", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
