import { useState } from "react"
import StatusBadge from "../../../components/StatusBadge"
import Table from "../../../components/Table"

const config = [
  {
    label: "Nama",
    render: (data) => data.name,
  },
  {
    label: "Jumlah",
    render: (data) => data.quantity,
  },
  {
    label: "Harga",
    render: (data) =>
      data.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
  },
  {
    label: "Total",
    render: (data) => {
      const total = data.quantity * data.price
      return total.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })
    },
  },
]

const statusOptions = [
  { value: "pending", label: "Menunggu" },
  { value: "processing", label: "Diproses" },
  { value: "shipped", label: "Dikirim" },
  { value: "delivered", label: "Diterima" },
  { value: "cancelled", label: "Dibatalkan" },
]

function DetailOrder({ order, onClose }) {
  const [status, setStatus] = useState(order.status)
  return (
    <div className="mt-8 text-green-900">
      <button
        type="button"
        onClick={onClose}
        className="text-sm hover:underline"
      >
        {"<<"} kembali
      </button>
      <h2 className="font-bold text-xl">Id: {order._id}</h2>
      <div className="text-sm overflow-y-auto">
        <table className="border-spacing-x-10">
          <tbody>
            <tr>
              <td className="font-semibold pr-10">Pembeli </td>
              <td>: {order.user.name}</td>
            </tr>
            <tr>
              <td className="font-semibold">Email </td>
              <td>: {order.email}</td>
            </tr>
            <tr>
              <td className="font-semibold">No Hp </td>
              <td>: {order.phone}</td>
            </tr>
            <tr>
              <td className="font-semibold">Alamat </td>
              <td>: {order.address}</td>
            </tr>
            <tr>
              <td className="font-semibold">Status</td>
              <td>
                : <StatusBadge status={order.status} />
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Catatan</td>
              <td>:</td>
            </tr>
          </tbody>
        </table>
        <p className="whitespace-normal break-words">{order.notes}</p>
      </div>
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
          disabled={status === order.status}
          type="button"
          className={`bg-green-800 text-white rounded px-3 py-1 ${
            status === order.status ? "opacity-50" : ""
          } `}
        >
          Simpan
        </button>
      </div>
      <Table data={order.items} config={config} />
    </div>
  )
}

export default DetailOrder
