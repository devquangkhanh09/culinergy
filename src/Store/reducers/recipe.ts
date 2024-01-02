import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipeID: 0,
  },
  reducers: {
    setRecipeByID: (state, action) => {
      state.recipeID = action.payload;
    },
  },
});

export const { setRecipeByID } = recipeSlice.actions;
export const recipeReducers = recipeSlice.reducer;
