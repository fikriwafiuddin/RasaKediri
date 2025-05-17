import mongoose from "mongoose"

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["food", "beverage"],
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      cloudinary_id: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Menu = mongoose.model("Menu", menuSchema)
export default Menu
