import { User } from "@/Services";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SimplifiedIngredient } from "./explore";
import { Recipe } from "@/Services/recipes";

interface UserState {
  isGuest: boolean;
  // WARNING: This is not a secure way to store a token! This setup is for development purposes only.
  token: string;
  profile: User;
  // TODO: store the last viewed recipe in the database
  recentlyViewedRecipe: Recipe;
}

const guestProfile: User = {
  _id: "",
  name: "Guest",
  email: "",
  isVegan: false,
  allergies: [],
  favorites: [],
};

const emptyRecipe: Recipe = {
  _id: -1,
  name: "",
  description: "",
  ingredients: [],
  instructions: [],
  imageUrl: "",
  timeToCook: "",
  favoriteCount: 0,
  tags: [],
  isFavorite: false,
};

const initialState: UserState = {
  isGuest: false,
  token: "",
  profile: guestProfile,
  recentlyViewedRecipe: emptyRecipe,
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setGuest: (state) => {
      state.isGuest = true;
      state.token = "";
      state.profile = guestProfile;
      state.recentlyViewedRecipe = emptyRecipe;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isGuest = false;
      if (action.payload === "") {
        state.profile = guestProfile;
      }
      state.recentlyViewedRecipe = emptyRecipe;
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
    },

    setRecentlyViewedRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recentlyViewedRecipe = action.payload;
    },
  },
});

export const { 
  setGuest, 
  setToken,
  setUserProfile,
  updateUserProfile,
  toggleAllergy,
  setRecentlyViewedRecipe,
} = slice.actions;
export const userReducers = slice.reducer;
