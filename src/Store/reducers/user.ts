import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    isGuest: false,
    // WARNING: This is not a secure way to store a token! This setup is for development purposes only.
    token: "",
  },
  reducers: {
    setGuest: (state) => {
      state.isGuest = true;
      state.token = "";
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isGuest = false;
    },
  },
});

export const { setGuest, setToken } = slice.actions;
export const userReducers = slice.reducer;
