import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  pos: [],
};

const resQuerySlice = createSlice({
  name: "resQuery",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setPosition(state, action) {
      state.pos = action.payload;
    },
  },
});

export const { setQuery, setPosition } = resQuerySlice.actions;

export default resQuerySlice.reducer;
