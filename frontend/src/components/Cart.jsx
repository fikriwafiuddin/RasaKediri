import { X, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Cart({ onClose, show }) {
  const navigate = useNavigate()

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
        <ul className="flex-1 overflow-y-auto space-y-4 px-4">
          <li>
            <div className="flex gap-2 relative">
              <button
                type="button"
                className="absolute top-0 right-0 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
              <img
                src="images/nasigoreng.jpg"
                alt=""
                className="size-24 rounded"
              />
              <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Nasi Goreng Spesial</span>
                  <span className="text-xs">Rp 18.000</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="outline-2 text-green-900 outline-green-900 hover:bg-green-900 hover:text-white rounded px-2"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    className="w-10 outline-2 outline-green-900 text-center rounded text-sm"
                    value={0}
                    readOnly
                  />
                  <button
                    type="button"
                    className="outline-2 text-green-900 outline-green-900 hover:bg-green-900 hover:text-white rounded px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>

        {/* Checkout */}
        <div className="p-4 border-t-2 border-green-900 bg-white">
          <p className="font-bold text-green-900">Total: Rp 300,000</p>
          <button
            onClick={() => navigate("/checkout")}
            type="button"
            className="bg-green-900 hover:bg-green-800 text-white py-2 rounded w-full mt-4"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  )
}
