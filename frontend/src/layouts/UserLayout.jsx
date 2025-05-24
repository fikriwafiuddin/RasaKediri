import React, { useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"
import Cart from "../components/Cart"
import { useDispatch, useSelector } from "react-redux"
import { getCart } from "../store/thunk/cartThunk"

function UserLayout({ children }) {
  const { user } = useSelector((state) => state.auth)
  const { cart, isLoadingGetCart } = useSelector((state) => state.cart)
  const [showCart, setShowCart] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(getCart())
    }
  }, [user, dispatch])

  const toggleCart = () => {
    setShowCart(!showCart)
  }

  return (
    <div className="bg-green-50 flex flex-col min-h-screen">
      <Cart
        onClose={toggleCart}
        show={showCart}
        cart={cart}
        isLoading={isLoadingGetCart}
      />
      <Header openCart={toggleCart} />
      <main className="flex-1 mb-24">{children}</main>
      <Footer />
    </div>
  )
}

export default UserLayout
