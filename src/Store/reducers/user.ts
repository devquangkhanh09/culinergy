import { User } from "@/Services";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SimplifiedIngredient } from "./explore";

interface UserState {
  isGuest: boolean;
  // WARNING: This is not a secure way to store a token! This setup is for development purposes only.
  token: string;
  profile: User;
}

const guestProfile: User = {
  _id: "",
  name: "Guest",
  email: "",
  isVegan: false,
  allergies: [],
  favorites: [],
};

const initialState: UserState = {
  isGuest: false,
  token: "",
  profile: guestProfile,
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setGuest: (state) => {
      state.isGuest = true;
      state.token = "";
      state.profile = guestProfile;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isGuest = false;
      if (action.payload === "") {
        state.profile = guestProfile;
      }
    },

    setUserProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    toggleAllergy: (state, action: PayloadAction<SimplifiedIngredient>) => {
      const index = state.profile.allergies.findIndex(
        (item) => item._id === action.payload._id,
      );
      if (index === -1) {
        state.profile.allergies.push(action.payload);
      } else {
        state.profile.allergies.splice(index, 1);
      }
    }
  },
});

export const { 
  setGuest, 
  setToken,
  setUserProfile,
  updateUserProfile,
  toggleAllergy,
} = slice.actions;
export const userReducers = slice.reducer;
