import { createBrowserRouter, RouterProvider } from "react-router-dom"
import guestRoute from "./routes/guestRoute"
import userRoute from "./routes/UserRoute"
import adminRoute from "./routes/adminRoute"

function App() {
  const router = createBrowserRouter([userRoute, guestRoute, adminRoute])
  return (
    <div className="font-poppins">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
