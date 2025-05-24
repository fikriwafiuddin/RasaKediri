import { useState } from "react"
import StatusBadge from "../../../components/StatusBadge"
import { formatCurrency } from "../../../utils/formatters"

export default function OrderCard({ order }) {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <div className="relative bg-white rounded-lg shadow max-w-2xl mx-auto p-4">
      <div className="absolute top-4 right-4">
        <StatusBadge status={order.status} />
      </div>
      <div className="border-b">
        <h2 className="text-lg font-bold text-green-900">Order #{order._id}</h2>
        <p className="text-sm text-gray-700">Nama: {order.name}</p>
        <p className="text-sm text-gray-700">Email: {order.email}</p>
        <p className="text-sm text-gray-700">Telepon: {order.phone}</p>
        <p className="text-sm text-gray-700">Alamat: {order.address}</p>
        {order.notes && (
          <p className="text-sm text-gray-700">Catatan: {order.notes}</p>
        )}
      </div>

      <button
        onClick={() => setShowDetail(showDetail ? false : order._id)}
        type="button"
        className="text-xs ml-auto block mt-1 text-green-600 hover:text-green-700"
      >
        {showDetail === order._id ? "Tutup detail <<" : "Lihat detail >>"}
      </button>

      {showDetail === order._id && (
        <div className="duration-200 transform transition-transform">
          <ul className="space-y-2">
            {order.orderItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm border-b pb-1"
              >
                <div>
                  <p className="font-medium">{item.menu.name}</p>
                  <p className="text-gray-600">
                    {item.quantity} ×{" "}
                    {formatCurrency(item.menu.price.toLocaleString())}
                  </p>
                </div>
                <p className="font-bold text-green-900">
                  {formatCurrency(item.quantity * item.menu.price)}
                </p>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t text-right">
            <p className="font-bold text-green-900 text-lg">
              Total: {formatCurrency(order.amount)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
