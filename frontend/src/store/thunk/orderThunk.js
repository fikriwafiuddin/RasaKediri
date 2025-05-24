import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../utils/axios"

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/order/getMyOrders")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (status, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/order/getOrders", {
        params: { status },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const changeStatusOrder = createAsyncThunk(
  "order/changeStatusOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.patch(
        `/order/changeOrderStatus/${id}`,
        { status }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/order/deleteOrder/${id}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const searchOrderById = createAsyncThunk(
  "order/searchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get(
        `/order/searchOrderById/${id}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
