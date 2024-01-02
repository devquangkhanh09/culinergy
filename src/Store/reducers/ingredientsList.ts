import { createSlice } from '@reduxjs/toolkit';

const ingredientListSlice = createSlice({
  name: 'ingredientList',
  initialState: {
    ingredientListIDs: [],
  },
  reducers: {
    setIngredientListIDs: (state, action) => {
      state.ingredientListIDs = action.payload;
    },
  },
});

export const { setIngredientListIDs } = ingredientListSlice.actions;
export const ingredientListReducers = ingredientListSlice.reducer;
