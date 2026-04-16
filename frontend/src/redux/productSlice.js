import { createSlice } from "@reduxjs/toolkit";

const productslice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setProducts, setCart } = productslice.actions;
export default productslice.reducer;
