import { createSlice } from "@reduxjs/toolkit"
import { getMe, loginUser, registerUser } from "../thunk/authThunk"
import { KEY_TOKEN } from "../../utils/constan"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoadingGetMe: false,
    isLoadingLogin: false,
    isLoadingRegister: false,
    message: {
      error: "",
      success: "",
    },
  },
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem(KEY_TOKEN)
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
      .addCase(getMe.pending, (state) => {
        state.isLoadingGetMe = true
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.isLoadingGetMe = false
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoadingGetMe = false
      })
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoadingLogin = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoadingLogin = false
        state.user = action.payload.data.user
        state.message.success = action.payload.message
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadingLogin = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoadingRegister = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoadingRegister = false
        state.user = action.payload.data.user
        state.message.success = action.payload.message
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoadingRegister = false
        state.message.error = action.payload.message
      })
  },
})

export const { logout, clearMessage } = authSlice.actions
export default authSlice.reducer
