import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeIndex: "All",
  isActive: false,
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setMenu(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

export const { setMenu } = deliverySlice.actions;

export default deliverySlice.reducer;
