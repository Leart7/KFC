import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: 1,
};

const activeMyAccountTabSlice = createSlice({
  name: "activeMyAccountTab",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = activeMyAccountTabSlice.actions;

export default activeMyAccountTabSlice.reducer;
