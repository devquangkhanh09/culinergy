import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// use index to detect update in favorites
interface FavoritesState {
  favoritesUpdatedIndex: number;
}

const initialState: FavoritesState = {
  favoritesUpdatedIndex: 0,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    updateFavorites: (state) => {
      state.favoritesUpdatedIndex += 1;
    },
  },
});

export const { updateFavorites } = favoritesSlice.actions;
export const favoritesReducers = favoritesSlice.reducer;
