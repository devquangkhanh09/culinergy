import { createSlice } from '@reduxjs/toolkit';

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: {
    ingredientID: 0,
  },
  reducers: {
    setIngredientByID: (state, action) => {
      state.ingredientID = action.payload;
    },
  },
});

export const { setIngredientByID } = ingredientSlice.actions;
export const ingredientReducers = ingredientSlice.reducer;
