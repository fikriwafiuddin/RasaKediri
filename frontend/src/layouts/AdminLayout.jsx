import { Box } from "lucide-react"
import { UtensilsCrossed } from "lucide-react"
import { Users } from "lucide-react"
import { X } from "lucide-react"
import { Menu } from "lucide-react"
import { LogOut } from "lucide-react"
import { LayoutGrid } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, Outlet, useLocation } from "react-router-dom"
import { logout } from "../store/slices/authSlice"
import Confirm from "../components/Confirm"

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutGrid />,
    to: "/admin/dashboard",
  },
  {
    id: "menu",
    label: "menu",
    icon: <UtensilsCrossed />,
    to: "/admin/menu",
  },
  {
    id: "orders",
    label: "Orders",
    icon: <Box />,
    to: "/admin/orders",
  },
  {
    label: "Users",
    icon: <Users />,
    to: "/admin/users",
  },
]

function AdminLayout() {
  const [currentPath, setCurrentPath] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  const handleLogout = () => {
    dispatch(logout())
    setOpenConfirm(false)
  }
  return (
    <div className="flex h-screen overflow-hidden bg-green-50">
      <Confirm
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleLogout}
        message={"Are you sure you want to exit?"}
      />

      <aside
        className={`fixed lg:relative top-0 left-0 h-full transition-transform z-20 bg-green-900 text-white w-64 p-4 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="absolute top-2 right-2 lg:hidden"
        >
          <X />
        </button>
        <h1 className="text-center font-bold text-2xl">Admin</h1>
        <nav className="mt-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <Link
                to={item.to}
                key={item.label}
                className={`flex gap-2 hover:underline ${
                  currentPath === item.to ? "underline" : ""
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </ul>
        </nav>
        <button
          onClick={() => setOpenConfirm(true)}
          type="button"
          className="absolute bottom-4 left-4 hover:underline flex gap-2"
        >
          <LogOut /> Logout
        </button>
      </aside>

      {/* toggle mobil */}
      <div className="lg:hidden absolute top-0 left-0 right-0 bg-white p-1">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="text-green-900"
        >
          <Menu size={28} />
        </button>
      </div>

      <main className="flex-1 overflow-y-auto px-4 py-12 lg:pt-5">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
