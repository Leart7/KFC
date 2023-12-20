import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "home",
};

const activeAddressTabSlice = createSlice({
  name: "activeAddressTab",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = activeAddressTabSlice.actions;

export default activeAddressTabSlice.reducer;
