import UserLayout from "../layouts/UserLayout"
import UserRoute from "../middleware/UserRoute"
import PaymentSuccess from "../pages/status/PaymentSuccess"
import Checkout from "../pages/user/checkout"
import Home from "../pages/user/home"
import Orders from "../pages/user/orders"

const userRoute = {
  path: "/",
  children: [
    {
      index: true,
      element: (
        <UserRoute>
          <UserLayout>
            <Home />
          </UserLayout>
        </UserRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <UserRoute>
          <UserLayout>
            <Orders />
          </UserLayout>
        </UserRoute>
      ),
    },
    {
      path: "/checkout",
      element: (
        <UserRoute>
          <UserLayout>
            <Checkout />
          </UserLayout>
        </UserRoute>
      ),
    },
    {
      path: "/payment-success",
      element: <PaymentSuccess />,
    },
  ],
}

export default userRoute
