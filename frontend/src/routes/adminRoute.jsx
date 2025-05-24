import AdminLayout from "../layouts/AdminLayout"
import AdminRoute from "../middleware/AdminRoute"
import Dashboard from "../pages/admin/dashboard"
import Menu from "../pages/admin/menu"
import Orders from "../pages/admin/orders"
import Users from "../pages/admin/users"

const adminRoute = {
  path: "/admin",
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/admin/menu",
      element: <Menu />,
    },
    {
      path: "/admin/orders",
      element: <Orders />,
    },
    {
      path: "/admin/users",
      element: <Users />,
    },
  ],
}

export default adminRoute
