import { createBrowserRouter, RouterProvider } from "react-router-dom"
import guestRoute from "./routes/guestRoute"
import userRoute from "./routes/userRoute"
import adminRoute from "./routes/adminRoute"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getMe } from "./store/thunk/authThunk"
import Spinner from "./components/Spinner"
import { ToastContainer } from "react-toastify"
import useMessage from "./hooks/useMessage"

function App() {
  const router = createBrowserRouter([userRoute, guestRoute, adminRoute])
  const { isLoadingGetMe } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useMessage()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  if (isLoadingGetMe) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Spinner size={12} />
      </div>
    )
  }
  return (
    <div className="font-poppins">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
