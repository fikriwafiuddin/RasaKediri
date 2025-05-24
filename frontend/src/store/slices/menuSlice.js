import { createSlice } from "@reduxjs/toolkit"
import { addMenu, deleteMenu, getMenus, updateMenu } from "../thunk/menuThunk"

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menus: [],
    isLoadingGetMenus: false,
    isLoading: false, // add menu & update menu
    isLoadingDeleteMenu: false,
    category: "food",
    message: {
      error: "",
      success: "",
    },
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    clearMessage(state) {
      state.message = {
        error: "",
        success: "",
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenus.pending, (state) => {
        state.isLoadingGetMenus = true
        state.menus = []
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.isLoadingGetMenus = false
        state.menus = action.payload.data.menus
      })
      .addCase(getMenus.rejected, (state) => {
        state.isLoadingGetMenus = false
      })
    builder
      .addCase(addMenu.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        state.isLoading = false
        const menu = action.payload.data.menu
        if (menu.category === state.category) {
          state.menus = [...state.menus, menu]
        }
        state.message.success = action.payload.message
      })
      .addCase(addMenu.rejected, (state, action) => {
        state.isLoading = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(deleteMenu.pending, (state) => {
        state.isLoadingDeleteMenu = true
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.isLoadingDeleteMenu = false
        const menu = action.payload.data.menu
        state.menus = state.menus.filter((item) => item._id !== menu._id)
        state.message.success = action.payload.message
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.isLoadingDeleteMenu = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(updateMenu.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.isLoading = false
        const menu = action.payload.data.menu
        const findIndex = state.menus.findIndex((item) => item._id === menu._id)
        if (findIndex !== -1) {
          state.menus[findIndex] = menu
        }
        state.message.success = action.payload.message
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.isLoading = false
        state.message.error = action.payload.message
      })
  },
})

export const { setCategory, clearMessage } = menuSlice.actions
export default menuSlice.reducer
