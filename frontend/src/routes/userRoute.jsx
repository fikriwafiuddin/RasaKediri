import UserLayout from "../layouts/UserLayout"
import UserRoute from "../middleware/UserRoute"
import Error404 from "../pages/status/Error404"
import Error500 from "../pages/status/Error500"
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
          <Checkout />
        </UserRoute>
      ),
    },
    {
      path: "/payment-success",
      element: <PaymentSuccess />,
    },
    {
      path: "/error-500",
      element: <Error500 />,
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ],
}

export default userRoute
