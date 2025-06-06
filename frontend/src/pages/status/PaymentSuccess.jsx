import { Link } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"

function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center space-y-4">
        <CheckCircle2 className="text-green-600 mx-auto" size={60} />
        <h1 className="text-2xl font-bold text-gray-800">Payment Success</h1>
        <p className="text-gray-600">
          Thank you! Your order has been successfully paid and is being
          processed.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
