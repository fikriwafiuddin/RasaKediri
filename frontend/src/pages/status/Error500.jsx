import { Link } from "react-router-dom"

function Error500() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-lime-600 mb-4">500</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          A server error occurred
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, something went wrong on our end. Please try again later.
        </p>
        <Link
          to="/"
          className="inline-block bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default Error500
