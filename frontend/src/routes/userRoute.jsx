import UserLayout from "../layouts/UserLayout"
import Checkout from "../pages/user/checkout"
import Home from "../pages/user/home"
import Orders from "../pages/user/orders"

const userRoute = {
  path: "/",
  children: [
    {
      index: true,
      element: (
        <UserLayout>
          <Home />
        </UserLayout>
      ),
    },
    {
      path: "/orders",
      element: (
        <UserLayout>
          <Orders />
        </UserLayout>
      ),
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ],
}

export default userRoute
