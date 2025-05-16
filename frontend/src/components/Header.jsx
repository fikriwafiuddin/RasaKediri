import { Link } from "react-router-dom"

export default function Header({ openCart }) {
  return (
    <header className="bg-green-700 text-white p-4 text-center flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-3xl font-bold font-pacifico">
        <Link to={"/"}>RasaKediri</Link>
      </h1>
      <div className="space-x-6 sm:space-x-4 mt-2 sm:mt-0 font-semibold">
        <Link to="/orders" className="hover:underline duration-200">
          Pesananan
        </Link>
        <button
          onClick={openCart}
          type="button"
          className="hover:underline duration-200"
        >
          Keranjang
        </button>
      </div>
    </header>
  )
}
