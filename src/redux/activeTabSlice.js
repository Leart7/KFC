import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeIndex: 0,
};

const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveIndex } = activeTabSlice.actions;

export default activeTabSlice.reducer;
