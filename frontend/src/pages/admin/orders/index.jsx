import { Info, Search, Trash2 } from "lucide-react"
import Input from "../../../components/Input"
import { useEffect, useState } from "react"
import Table from "../../../components/Table"
import DetailOrder from "./DetailOrder"
import StatusBadge from "../../../components/StatusBadge"
import { useDispatch, useSelector } from "react-redux"
import { setStatus } from "../../../store/slices/orderSlice"
import Spinner from "../../../components/Spinner"
import {
  deleteOrder,
  getOrders,
  searchOrderById,
} from "../../../store/thunk/orderThunk"
import Confirm from "../../../components/Confirm"

const statusOptions = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
]

const config = [
  {
    label: "Id",
    render: (data) => data._id,
  },
  {
    label: "Buyer",
    render: (data) => data.user.name,
  },
  {
    label: "Total",
    render: (data) =>
      data.amount.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
  },
  {
    label: "Status",
    render: (data) => <StatusBadge status={data.status} />,
  },
  {
    label: "Date",
    render: (data) =>
      new Date(data.createdAt).toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
      }),
  },
  {
    label: "Action",
    render: (data, action) => (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => action.openDetails(data)}
          className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
        >
          <Info size={16} />
        </button>
        <button
          onClick={() => action.deleteOrder(data._id)}
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
]

function Orders() {
  const { status, orders, isLoadingGetOrders, isLoadingDeleteOrder } =
    useSelector((state) => state.order)
  const [search, setSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [deleteOrderId, setDeleteOrderId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders(status))
  }, [dispatch, status])

  const handleSetStatus = (status) => {
    dispatch(setStatus(status))
    setSearch("")
  }

  const handleDeleteOrder = () => {
    dispatch(deleteOrder(deleteOrderId))
      .unwrap()
      .then(() => setDeleteOrderId(null))
  }

  const action = {
    openDetails: (order) => setSelectedOrder(order),
    deleteOrder: (orderId) => setDeleteOrderId(orderId),
  }

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(searchOrderById(search))
  }

  return (
    <>
      <Confirm
        isOpen={deleteOrderId !== null}
        onClose={() => setDeleteOrderId(null)}
        message={`Are you sure you want to delete the ${deleteOrderId} order?`}
        isLoading={isLoadingDeleteOrder}
        onConfirm={handleDeleteOrder}
      />
      <h1 className="text-2xl font-bold text-green-900">Orders</h1>
      {selectedOrder ? (
        <DetailOrder
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      ) : (
        <>
          <div className="flex justify-between flex-col lg:flex-row items-start gap-2 mt-5 text-green-900">
            <form onSubmit={handleSearch}>
              <div className="flex gap-2">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  name={"search"}
                  placeholder={"Find order by id"}
                />
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 rounded text-white px-4"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
            <select
              value={status}
              onChange={(e) => handleSetStatus(e.target.value)}
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
          </div>
          {isLoadingGetOrders ? (
            <Spinner size={12} />
          ) : orders.length === 0 ? (
            <p className="text-center text-xl">Orders not found</p>
          ) : (
            <Table data={orders} config={config} action={action} />
          )}
        </>
      )}
    </>
  )
}

export default Orders
