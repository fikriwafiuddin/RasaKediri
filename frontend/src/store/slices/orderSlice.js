import { createSlice } from "@reduxjs/toolkit"
import {
  changeStatusOrder,
  deleteOrder,
  getMyOrders,
  getOrders,
  searchOrderById,
} from "../thunk/orderThunk"

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    myOrders: [],
    isLoadingGetMyOrders: false,
    isLoadingGetOrders: false,
    isLoadingChangeStatusOrder: false,
    isLoadingDeleteOrder: false,
    status: "pending",
    message: {
      error: "",
      success: "",
    },
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    clearMessage: (state) => {
      state.message = {
        error: "",
        success: "",
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.isLoadingGetMyOrders = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoadingGetMyOrders = false
        state.myOrders = action.payload.data.orders
      })
      .addCase(getMyOrders.rejected, (state) => {
        state.isLoadingGetMyOrders = false
      })
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoadingGetOrders = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoadingGetOrders = false
        state.orders = action.payload.data.orders
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoadingGetOrders = false
      })
    builder
      .addCase(changeStatusOrder.pending, (state) => {
        state.isLoadingChangeStatusOrder = true
      })
      .addCase(changeStatusOrder.fulfilled, (state, action) => {
        state.isLoadingChangeStatusOrder = false
        const order = action.payload.data.order
        state.orders = state.orders.filter((item) => item._id !== order._id)
        state.message.success = action.payload.message
      })
      .addCase(changeStatusOrder.rejected, (state, action) => {
        state.isLoadingChangeStatusOrder = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoadingDeleteOrder = true
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoadingDeleteOrder = false
        const order = action.payload.data.order
        state.orders = state.orders.filter((item) => item._id !== order._id)
        state.message.success = action.payload.message
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoadingDeleteOrder = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(searchOrderById.pending, (state) => {
        state.isLoadingGetOrders = true
      })
      .addCase(searchOrderById.fulfilled, (state, action) => {
        state.isLoadingGetOrders = false
        state.orders = [action.payload.data.order]
      })
      .addCase(searchOrderById.rejected, (state, action) => {
        state.isLoadingGetOrders = false
        state.message.error = action.payload.message
      })
  },
})

export const { setStatus, clearMessage } = orderSlice.actions
export default orderSlice.reducer
