import { useState } from "react"
import StatusBadge from "../../../components/StatusBadge"
import Table from "../../../components/Table"
import { formatCurrency } from "../../../utils/formatters"
import { useDispatch, useSelector } from "react-redux"
import { changeStatusOrder } from "../../../store/thunk/orderThunk"
import Spinner from "../../../components/Spinner"

const config = [
  {
    label: "Name",
    render: (data) => data.menu.name,
  },
  {
    label: "Quantity",
    render: (data) => data.quantity.toLocaleString(),
  },
  {
    label: "Price",
    render: (data) => formatCurrency(data.menu.price),
  },
  {
    label: "Total",
    render: (data) => formatCurrency(data.quantity * data.menu.price),
  },
]

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
]

function DetailOrder({ order, onClose }) {
  const [status, setStatus] = useState(order.status)
  const { isLoadingChangeStatusOrder } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  const handleStatusChange = () => {
    dispatch(changeStatusOrder({ id: order._id, status }))
      .unwrap()
      .then(() => onClose())
  }

  return (
    <div className="mt-8 text-green-900">
      <button
        type="button"
        onClick={onClose}
        className="text-sm hover:underline"
      >
        {"<<"} back
      </button>
      <h2 className="font-bold text-xl">Id: {order._id}</h2>
      <div className="text-sm overflow-y-auto">
        <table className="border-spacing-x-10">
          <tbody>
            <tr>
              <td className="font-semibold pr-10">Buyer </td>
              <td>: {order.name}</td>
            </tr>
            <tr>
              <td className="font-semibold">Email </td>
              <td>: {order.email}</td>
            </tr>
            <tr>
              <td className="font-semibold">Phone </td>
              <td>: {order.phone}</td>
            </tr>
            <tr>
              <td className="font-semibold">Address </td>
              <td>: {order.address}</td>
            </tr>
            <tr>
              <td className="font-semibold">Status</td>
              <td>
                : <StatusBadge status={order.status} />
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Notes</td>
              <td>:</td>
            </tr>
          </tbody>
        </table>
        <p className="whitespace-normal break-words">{order.notes}</p>
      </div>
      {!["cancelled", "delivered"].includes(order.status) && (
        <div className="flex mt-5 gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            name="status"
            id="status"
            className="border-2 border-green-900 bg-white rounded px-4 py-1 text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleStatusChange}
            disabled={status === order.status || isLoadingChangeStatusOrder}
            type="button"
            className={`bg-green-800 text-white rounded px-3 py-1 ${
              status === order.status ? "opacity-50" : ""
            } `}
          >
            {isLoadingChangeStatusOrder ? (
              <Spinner size={4} type="secondary" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      )}
      <Table data={order.orderItems} config={config} />
    </div>
  )
}

export default DetailOrder
