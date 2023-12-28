import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExploreState {
  selectedIngredients: string[];
}

const initialState: ExploreState = {
  selectedIngredients: [],
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState: initialState,
  reducers: {
    toggleIngredient: (state, action: PayloadAction<string>) => {
      const ingredient = action.payload;
      const index = state.selectedIngredients.findIndex(
        (item) => item === ingredient,
      );
      if (index === -1) {
        state.selectedIngredients.push(ingredient);
      } else {
        state.selectedIngredients.splice(index, 1);
      }
    }
  },
});

export const { toggleIngredient } = exploreSlice.actions;
export const exploreReducers = exploreSlice.reducer;
