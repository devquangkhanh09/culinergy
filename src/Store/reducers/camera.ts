import { createSlice } from '@reduxjs/toolkit';

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    imageUrl: { uri: 'https://picsum.photos/200/300' },
  },
  reducers: {
    setImage: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setImage } = cameraSlice.actions;
export const cameraReducers = cameraSlice.reducer;
