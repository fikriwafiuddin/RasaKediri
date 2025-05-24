import { useDispatch, useSelector } from "react-redux"
import OrderCard from "./OrderCard"
import { useEffect } from "react"
import { getMyOrders } from "../../../store/thunk/orderThunk"
import Spinner from "../../../components/Spinner"

function Orders() {
  const { myOrders, isLoadingGetMyOrders } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  return (
    <>
      <h1 className="text-3xl font-bold text-green-900 text-center mb-6 mt-2">
        Pesanan
      </h1>
      <div className="space-y-4">
        {isLoadingGetMyOrders ? (
          <Spinner size={12} />
        ) : myOrders.length === 0 ? (
          <p className="text-center">Orders not found</p>
        ) : (
          myOrders.map((order) => <OrderCard order={order} key={order._id} />)
        )}
      </div>
    </>
  )
}

export default Orders
