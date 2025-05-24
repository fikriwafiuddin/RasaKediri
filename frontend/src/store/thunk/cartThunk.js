import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../utils/axios"

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/cart/getCart")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const addMenuToCart = createAsyncThunk(
  "cart/addMenuToCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post("/cart/addMenuToCart", data)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateMenuCart = createAsyncThunk(
  "cart/updateMenuCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.patch(
        "/cart/updateMenuCart",
        data
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
