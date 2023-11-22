import { createSlice } from '@reduxjs/toolkit';

interface SingleProduct {
  cartId?: string;
  _id: string;
  name: string;
  category: string;
  quantity?: number;
  price: number;
}

interface APIProductInterface {
  _id: string;
  productId: SingleProduct;
  quantity: number;
}

export interface CartState {
  count: number;
  products: SingleProduct[];
}

const initialState: CartState = {
  count: 0,
  products: []
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductInCart: (state, action) => {
      const products = state.products;
      const isExists = products?.find(
        (product) => product?._id === action?.payload?._id
      );
      if (isExists) {
        state.products = state.products.map((product) => {
          if (product._id === action.payload._id) {
            return {
              ...product,
              quantity: (product?.quantity ?? 0) + 1
            };
          }
          return product;
        });
      } else {
        state.products = [
          ...state.products,
          { ...action.payload, quantity: 1 }
        ];
        state.count++;
      }
    },
    removeProductFromCart: (state, action) => {
      const products = state.products?.filter(
        (r) => r?._id !== action?.payload
      );
      state.products = products;
      state.count--;
    },
    setProductsInCart: (state, action) => {
      state.products = action.payload?.map((record: APIProductInterface) => {
        return {
          cartId: record?._id,
          ...record?.productId,
          quantity: record?.quantity
        }
      });
      state.count = action?.payload?.length;
    },
    updateProductQuantity: (state, action) => {
      const products = state.products.map((product, index) => {
        if (product._id === action.payload.productId) {
          if (action.payload.quantity === 0) {
            return null as any
          }
          return {
            ...product,
            quantity: action.payload.quantity
          };
        }
        return product;
      });

      state.products = products.filter((product) => product !== null);
      state.count = state.products.length
    },
    resetState: (state) => {
      state = initialState
    }
  }
});

// Action creators are generated for each case reducer function
export const { addProductInCart, removeProductFromCart, setProductsInCart, updateProductQuantity, resetState } =
  cartSlice.actions;

export default cartSlice.reducer;
