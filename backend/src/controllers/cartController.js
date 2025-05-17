import Cart from "../models/cartModel.js"
import Menu from "../models/menuModel.js"

export const getCart = async (req, res) => {
  const user = req.user
  try {
    const cart = await Cart.findOne({ user: user._id }).populate(
      "menuItems.menu"
    )
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", errors: {} })
    }

    return res.status(200).json({ message: "Cart found", data: { cart } })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const addMenuToCart = async (req, res) => {
  const { id, quantity } = req.body
  const user = req.user
  try {
    const menu = await Menu.findById(id)
    if (!menu)
      return res
        .status(404)
        .json({ message: "Menu item not found", errors: {} })

    const cart = await Cart.findOne({ user: user._id }).populate(
      "menuItems.menu"
    )
    if (!cart) {
      const newCart = new Cart({
        user: user._id,
        menuItems: [{ menu: menu._id, quantity }],
      })
      await newCart.save()

      return res
        .status(200)
        .json({ message: "Product added to cart", data: { cart: newCart } })
    }

    const findIndex = cart.menuItems.findIndex(
      (value) => value.menu._id === menu._id
    )
    if (findIndex === -1) {
      cart.menuItems.push({ menu: menu._id, quantity })
    } else {
      cart.menuItems[findIndex].quantity += quantity
    }

    const updatedCart = await cart.save()
    return res.status(200).json({
      message: "Product added to cart",
      data: {
        cart: updatedCart,
      },
    })
  } catch (error) {
    console.log("Error in addProductToCart", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const updateMenuCart = async (req, res) => {
  const { id, quantity } = req.body
  const user = req.user
  try {
    const cart = await Cart.findOne({ user: user._id }).populate(
      "menuItems.menu"
    )
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", errors: {} })
    }

    const findIndex = cart.menuItems.findIndex(
      (value) => value.menu._id.toString() === id
    )
    if (findIndex === -1) {
      return res
        .status(404)
        .json({ message: "Menu item not found", errors: {} })
    }

    if (quantity == 0) {
      cart.menuItems.splice(findIndex, 1)
    } else {
      cart.menuItems[findIndex].quantity = quantity
    }

    const updatedCart = await cart.save()
    return res
      .status(200)
      .json({ message: "Menu item updated", data: { cart: updatedCart } })
  } catch (error) {
    console.log("Error in updateMenuCart", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
