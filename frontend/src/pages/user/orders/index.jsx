import Footer from "../../../components/Footer"
import Header from "../../../components/Header"
import OrderCard from "./OrderCard"

function Orders() {
  const orders = [
    {
      _id: "eeee",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      address: "123 Main St",
      notes: "sssssssss",
      status: "pending",
      orderItems: [
        { _id: "sjslj", name: "Product 1", quantity: 2, price: 10000 },
        { _id: "sjslj", name: "Product 1", quantity: 2, price: 10000 },
      ],
    },
    {
      _id: "eeee1",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      address: "123 Main St",
      notes: "sssssssss",
      status: "delivered",
      orderItems: [
        { _id: "sjslj", name: "Product 1", quantity: 2, price: 10000 },
        { _id: "sjslj", name: "Product 1", quantity: 2, price: 10000 },
      ],
    },
  ]
  return (
    <>
      <h1 className="text-3xl font-bold text-green-900 text-center mb-6 mt-2">
        Pesanan
      </h1>
      <div className="space-y-4">
        {orders.length === 0 && (
          <p className="text-center">Belum ada pesanan</p>
        )}
        {orders.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    </>
  )
}

export default Orders
