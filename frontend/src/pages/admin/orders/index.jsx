import { Info, Search, Trash2 } from "lucide-react"
import Input from "../../../components/Input"
import { useState } from "react"
import Table from "../../../components/Table"
import DetailOrder from "./DetailOrder"
import StatusBadge from "../../../components/StatusBadge"

const statusOptions = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Menunggu" },
  { value: "processing", label: "Diproses" },
  { value: "shipped", label: "Dikirim" },
  { value: "delivered", label: "Diterima" },
  { value: "cancelled", label: "Dibatalkan" },
]

const config = [
  {
    label: "Id",
    render: (data) => data._id,
  },
  {
    label: "Pembeli",
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
    label: "Tanggal",
    render: (data) =>
      new Date(data.createdAt).toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
      }),
  },
  {
    label: "Aksi",
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

const orders = [
  {
    _id: "68149c48088f4ea00fd3d4fd",
    user: {
      name: "John Doe",
    },
    name: "Jhon Doe",
    email: "johndoe@example.com",
    phone: "081234567890",
    address: "Jl. Raya No. 123",
    notes: "Catatan pesanan",
    amount: 10000,
    status: "pending",
    items: [
      {
        productId: "22222",
        name: "Nasi Goreng",
        price: 10000,
        quantity: 2,
      },
    ],
    createdAt: "2023-02-20T14:30:00.000Z",
  },
]

function Orders() {
  const [status, setStatus] = useState("pending")
  const [search, setSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const action = {
    openDetails: (order) => setSelectedOrder(order),
    deleteOrder: (orderId) => console.log(orderId),
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-green-900">Pesanan</h1>
      {selectedOrder ? (
        <DetailOrder
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      ) : (
        <>
          <div className="flex justify-between flex-col lg:flex-row items-start gap-2 mt-5 text-green-900">
            <form>
              <div className="flex gap-2">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  name={"search"}
                  placeholder={"Cari id pesanan..."}
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
          </div>
          <Table data={orders} config={config} action={action} />
        </>
      )}
    </>
  )
}

export default Orders
