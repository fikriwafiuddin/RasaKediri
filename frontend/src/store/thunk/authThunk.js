import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance, axiosInstance } from "../../utils/axios"
import { KEY_TOKEN } from "../../utils/constan"

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/auth/getMe")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data)
      localStorage.setItem(KEY_TOKEN, response.data.data.token)
      return response.data
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", data)
      localStorage.setItem(KEY_TOKEN, response.data.data.token)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
