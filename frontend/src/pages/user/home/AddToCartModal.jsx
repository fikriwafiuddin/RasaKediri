import { X } from "lucide-react"
import { useState } from "react"
import { formatCurrency } from "../../../utils/formatters"
import Spinner from "../../../components/Spinner"

function AddToCartModal({ food, onClose, onAddToCart, isLoading }) {
  const [quantity, setQuantity] = useState(1)

  const handleChangeQuantity = (event) => {
    if (event === "plus") setQuantity(quantity + 1)
    if (event === "minus") quantity > 1 && setQuantity(quantity - 1)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-1">
      <div className="relative p-6 rounded shadow bg-white w-md">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-red-500"
        >
          <X size={20} />
        </button>
        <img
          src={food.image.url}
          alt={food.name}
          className="h-48 w-full object-cover rounded"
        />
        <h3 className="font-bold text-green-900 mt-4 text-xl">{food.name}</h3>
        <p className="text-green-900 mt-1">{formatCurrency(food.price)}</p>
        <p className="text-sm mb-5">{food.description}</p>
        <div className="flex items-center gap-4 mb-3 text-green-900">
          <button
            onClick={() => handleChangeQuantity("minus")}
            type="button"
            className="rounded outline-2 outline-green-900 px-2 hover:bg-green-900 hover:text-white"
          >
            -
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => handleChangeQuantity("plus")}
            type="button"
            className="rounded outline-2 outline-green-900 px-2 hover:bg-green-900 hover:text-white"
          >
            +
          </button>
        </div>
        <button
          disabled={isLoading}
          onClick={() => onAddToCart(food._id, quantity)}
          type="button"
          className="bg-green-900 hover:bg-green-900 text-white rounded w-full py-2"
        >
          {isLoading ? <Spinner size={4} type="secondary" /> : "Add to cart"}
        </button>
      </div>
    </div>
  )
}

export default AddToCartModal
