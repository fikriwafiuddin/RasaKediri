import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../utils/axios"

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/user/getUsers")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getUserByName = createAsyncThunk(
  "user/getUserByName",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get(
        `/user/getUserByName/${name}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
