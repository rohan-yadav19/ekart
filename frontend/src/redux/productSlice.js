import { createSlice } from "@reduxjs/toolkit";

const productslice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productslice.actions;
export default productslice.reducer;
