import { configureStore } from "@reduxjs/toolkit"
import menuReducer from "./slices/menuSlice"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
import userReducer from "./slices/userSlice"

const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
})

export default store
