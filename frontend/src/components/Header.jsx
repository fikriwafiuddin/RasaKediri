import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../store/slices/authSlice"

export default function Header({ openCart }) {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <header className="bg-green-700 text-white p-4 text-center flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-3xl font-bold font-pacifico">
        <Link to={"/"}>RasaKediri</Link>
      </h1>
      <div className="space-x-6 sm:space-x-4 mt-2 sm:mt-0 font-semibold">
        {user ? (
          <>
            <Link to="/orders" className="hover:underline duration-200">
              Orders
            </Link>
            <button
              onClick={openCart}
              type="button"
              className="hover:underline duration-200"
            >
              Cart
            </button>
            <button onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="hover:underline duration-200">
              Login
            </Link>
            <Link to="/auth/register" className="hover:underline duration-200">
              Registrasi
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
