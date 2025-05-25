import { createSlice } from "@reduxjs/toolkit"
import { getUserByName, getUsers } from "../thunk/userThunk"

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoadingGetUsers: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoadingGetUsers = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data.users
        state.isLoadingGetUsers = false
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoadingGetUsers = false
      })
    builder
      .addCase(getUserByName.pending, (state) => {
        state.isLoadingGetUsers = true
      })
      .addCase(getUserByName.fulfilled, (state, action) => {
        state.users = action.payload.data.users
        state.isLoadingGetUsers = false
      })
      .addCase(getUserByName.rejected, (state) => {
        state.isLoadingGetUsers = false
      })
  },
})

export default userSlice.reducer
