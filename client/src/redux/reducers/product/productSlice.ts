import { createSlice } from '@reduxjs/toolkit'

export interface ProductState {
  products: { [key: string]: string }[]
}

const initialState: ProductState = {
  products: []
}
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions

export default productSlice.reducer