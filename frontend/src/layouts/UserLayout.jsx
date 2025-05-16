import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"
import Cart from "../components/Cart"

function UserLayout({ children }) {
  const [showCart, setShowCart] = useState(false)

  const toggleCart = () => {
    setShowCart(!showCart)
  }
  return (
    <div className="bg-green-50 flex flex-col min-h-screen">
      <Cart onClose={toggleCart} show={showCart} />
      <Header openCart={toggleCart} />
      <main className="flex-1 mb-24">{children}</main>
      <Footer />
    </div>
  )
}

export default UserLayout
