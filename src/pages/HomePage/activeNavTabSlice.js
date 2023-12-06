import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeIndex: 0,
};

const activeNavTabSlice = createSlice({
  name: "activeNavTab",
  initialState,
  reducers: {
    setActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveIndex } = activeNavTabSlice.actions;

export default activeNavTabSlice.reducer;
