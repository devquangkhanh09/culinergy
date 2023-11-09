import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "first-time",
  initialState: { isFirstTime: true },
  reducers: {
    setFirstTime: (state) => {
      if (state.isFirstTime) {
        state.isFirstTime = false;
      }
    },
  },
});

export const { setFirstTime } = slice.actions;

export const firstTimeReducers = slice.reducer;
