import { Ingredient } from '@/Services/ingredients';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SimplifiedIngredient = Pick<Ingredient, '_id' | 'name'>;

interface ExploreState {
  selectedIngredients: SimplifiedIngredient[];
  ingredients: SimplifiedIngredient[];
}

const initialState: ExploreState = {
  selectedIngredients: [],
  ingredients: [],
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState: initialState,
  reducers: {
    toggleIngredient: (state, action: PayloadAction<SimplifiedIngredient>) => {
      const ingredient = action.payload;
      const index = state.selectedIngredients.findIndex(
        (item) => item._id === ingredient._id,
      );
      if (index === -1) {
        state.selectedIngredients.push(ingredient);
      } else {
        state.selectedIngredients.splice(index, 1);
      }
    },
    saveIngredients: (state, action: PayloadAction<ExploreState>) => {
      state.ingredients = action.payload.ingredients;
    },
  },
});

export const { toggleIngredient, saveIngredients } = exploreSlice.actions;
export const exploreReducers = exploreSlice.reducer;
