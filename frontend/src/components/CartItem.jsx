import { useEffect, useState } from "react"
import { formatCurrency } from "../utils/formatters"
import { Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { updateMenuCart } from "../store/thunk/cartThunk"
import Spinner from "./Spinner"
import { setUnsavedChange } from "../store/slices/cartSlice"

function CartItem({ item }) {
  const [newQuantity, setNewQuantity] = useState(item.quantity)
  const isLoading = useSelector(
    (state) => state.cart.isLoadingById[item.menu._id]
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setUnsavedChange({
        id: item.menu._id,
        hasChange: newQuantity !== item.quantity,
      })
    )
  }, [newQuantity, item.quantity, item.menu._id, dispatch])

  const handleSave = () => {
    dispatch(updateMenuCart({ id: item.menu._id, quantity: newQuantity }))
  }

  const handleDelete = () => {
    dispatch(updateMenuCart({ id: item.menu._id, quantity: 0 }))
  }

  return (
    <div className="flex gap-2 relative">
      <button
        onClick={handleDelete}
        type="button"
        className="absolute top-0 right-0 hover:text-red-500"
      >
        {isLoading ? <Spinner size={4} /> : <Trash2 size={18} />}
      </button>
      <img
        src={item.menu.image.url}
        alt={item.menu.name}
        className="size-24 rounded"
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-sm">{item.menu.name}</span>
          <span className="text-xs">
            {formatCurrency(item.menu.price * item.quantity)}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (newQuantity > 1) {
                setNewQuantity(newQuantity - 1)
              }
            }}
            type="button"
            className="outline-2 text-green-900 outline-green-900 hover:bg-green-900 hover:text-white rounded px-2"
          >
            -
          </button>
          <input
            type="number"
            name="quantity"
            className="w-10 outline-2 outline-green-900 text-center rounded text-sm"
            item={0}
            value={newQuantity}
            readOnly
          />
          <button
            onClick={() => setNewQuantity(newQuantity + 1)}
            type="button"
            className="outline-2 text-green-900 outline-green-900 hover:bg-green-900 hover:text-white rounded px-2"
          >
            +
          </button>
          {item.quantity !== newQuantity && (
            <button
              onClick={handleSave}
              type="button"
              className="bg-green-900 text-white text-sm rounded px-3 hover:bg-green-700"
            >
              {isLoading ? <Spinner size={4} type="secondary" /> : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartItem
