import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  menuItems: [
    {
      menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
})

const Cart = mongoose.model("Cart", cartSchema)
export default Cart
