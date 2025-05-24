import { Outlet } from "react-router-dom"
import GuestRoute from "../middleware/GuestRoute"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"

const guestRoute = {
  path: "/auth",
  element: (
    <GuestRoute>
      <Outlet />
    </GuestRoute>
  ),
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
}

export default guestRoute
