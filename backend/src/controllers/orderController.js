import Cart from "../models/cartModel.js"
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
  try {
    const orders = await Order.find().populate("orderItems.menu")
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
  const status = req.body.status
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    ).populate("orderItems.menu")
    return res.status(200).json({
      message: "Order status updated successfully",
      data: { order: updatedOrder },
    })
  } catch (error) {
    console.log("Error in changeStatusOrder", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
