import { createSlice } from "@reduxjs/toolkit"
import { addMenuToCart, getCart, updateMenuCart } from "../thunk/cartThunk"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    isLoadingGetCart: false,
    isLoadingAddCart: false,
    isLoadingById: {},
    unsavedChangesById: {},
    message: {
      error: "",
      success: "",
    },
  },
  reducers: {
    resetCart(state) {
      state.cart = null
    },
    setUnsavedChange(state, action) {
      const { id, hasChange } = action.payload
      state.unsavedChangesById[id] = hasChange
    },
    setItemLoading(state, action) {
      const { id, loading } = action.payload
      state.isLoadingById[id] = loading
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
      .addCase(getCart.pending, (state) => {
        state.isLoadingGetCart = true
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoadingGetCart = false
        state.cart = action.payload.data.cart
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoadingGetCart = false
      })
    builder
      .addCase(addMenuToCart.pending, (state) => {
        state.isLoadingAddCart = true
      })
      .addCase(addMenuToCart.fulfilled, (state, action) => {
        state.isLoadingAddCart = false
        state.cart = action.payload.data.cart
        state.message.success = action.payload.message
      })
      .addCase(addMenuToCart.rejected, (state, action) => {
        state.isLoadingAddCart = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(updateMenuCart.pending, (state, action) => {
        const id = action.meta.arg.id
        state.isLoadingById[id] = true
      })
      .addCase(updateMenuCart.fulfilled, (state, action) => {
        state.cart = action.payload.data.cart
        const id = action.meta.arg.id
        state.isLoadingById[id] = false
        state.unsavedChangesById[id] = false
      })
      .addCase(updateMenuCart.rejected, (state, action) => {
        const id = action.meta.arg.id
        state.isLoadingById[id] = true
      })
  },
})

export const { setUnsavedChange, setItemLoading, clearMessage, resetCart } =
  cartSlice.actions
export default cartSlice.reducer
