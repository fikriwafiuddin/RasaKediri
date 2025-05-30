import { Link } from "react-router-dom"

function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-6xl font-bold text-lime-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page not found</p>
      <Link
        to="/"
        className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 transition"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default Error404
