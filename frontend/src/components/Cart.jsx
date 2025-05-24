import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Spinner from "./Spinner"
import { formatCurrency } from "../utils/formatters"
import CartItem from "./CartItem"
import { useSelector } from "react-redux"

export default function Cart({ onClose, show, cart, isLoading }) {
  const { isLoadingById, unsavedChangesById } = useSelector(
    (state) => state.cart
  )
  const navigate = useNavigate()

  const totalPrice =
    cart?.menuItems.reduce((total, item) => {
      return total + item.menu.price * item.quantity
    }, 0) || 0

  const hasUnsavedChanges = Object.values(unsavedChangesById).some(Boolean)
  const hasLoadingItems = Object.values(isLoadingById).some(Boolean)

  const isCheckoutDisabled =
    cart?.menuItems.length === 0 || hasUnsavedChanges || hasLoadingItems

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 bg-black/50 flex justify-end duration-500 transform transition-transform ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-full w-full pt-4 max-w-96 bg-green-50 flex flex-col justify-between"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 hover:text-red-500"
        >
          <X />
        </button>
        {/* Header */}
        <h2 className="text-center font-bold text-green-900 text-xl mb-4">
          Keranjang
        </h2>

        {/* List item scrollable */}
        {isLoading && <Spinner size={12} />}
        {(!cart || cart?.menuItems.length < 1) && !isLoading ? (
          <p className="text-center text-xl">Cart is empty</p>
        ) : (
          <ul className="flex-1 overflow-y-auto space-y-4 px-4">
            {cart?.menuItems.map((value) => {
              return (
                <li key={value.menu._id}>
                  <CartItem item={value} />
                </li>
              )
            })}
          </ul>
        )}

        {/* Checkout */}
        <div className="p-4 border-t-2 border-green-900 bg-white">
          <p className="font-bold text-green-900">
            Total: {formatCurrency(totalPrice)}
          </p>
          <button
            disabled={isCheckoutDisabled}
            onClick={() => navigate("/checkout")}
            type="button"
            className={`bg-green-900 hover:bg-green-800 text-white py-2 rounded w-full mt-4 ${
              isCheckoutDisabled && "opacity-50 cursor-not-allowed"
            }`}
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  )
}
