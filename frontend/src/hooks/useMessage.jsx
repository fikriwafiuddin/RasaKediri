import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearMessage as clearMessageAuth } from "../store/slices/authSlice"
import { clearMessage as clearMessageCart } from "../store/slices/cartSlice"
import { clearMessage as clearMessageMenu } from "../store/slices/menuSlice"
import { clearMessage as clearMessageOrder } from "../store/slices/orderSlice"

function useMessage() {
  const { message: messageAuth } = useSelector((state) => state.auth)
  const { message: messageCart } = useSelector((state) => state.cart)
  const { message: messageMenu } = useSelector((state) => state.menu)
  const { message: messageOrder } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    if (messageAuth.success) {
      toast.success(messageAuth.success)
      dispatch(clearMessageAuth())
    } else if (messageAuth.error) {
      toast.error(messageAuth.error)
      dispatch(clearMessageAuth())
    }
  }, [messageAuth, dispatch])

  useEffect(() => {
    if (messageCart.success) {
      toast.success(messageCart.success)
      dispatch(clearMessageCart())
    } else if (messageCart.error) {
      toast.error(messageCart.error)
      dispatch(clearMessageCart())
    }
  }, [messageCart, dispatch])

  useEffect(() => {
    if (messageMenu.success) {
      toast.success(messageMenu.success)
      dispatch(clearMessageMenu())
    } else if (messageMenu.error) {
      toast.error(messageMenu.error)
      dispatch(clearMessageMenu())
    }
  }, [messageMenu, dispatch])

  useEffect(() => {
    if (messageOrder.success) {
      toast.success(messageOrder.success)
      dispatch(clearMessageOrder())
    } else if (messageOrder.error) {
      toast.error(messageOrder.error)
      dispatch(clearMessageOrder())
    }
  }, [messageOrder, dispatch])
}

export default useMessage
