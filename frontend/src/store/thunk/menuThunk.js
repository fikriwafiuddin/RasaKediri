import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance, axiosInstance } from "../../utils/axios"

export const getMenus = createAsyncThunk(
  "menu/getMenus",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/menu/getMenus", {
        params: { category },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post("/menu/addMenu", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(`/menu/deleteMenu/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.patch(
        `/menu/updateMenu/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
