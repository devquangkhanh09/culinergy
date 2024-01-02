import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  title: string;
  content: string;
  isOpen: boolean;
}

const initialState: ModalState = {
  title: '',
  content: '',
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalState>) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.isOpen = action.payload.isOpen;
    },

    activateUserOnlyModal: (state) => {
      state.title = 'User Only';
      state.content = 'Please login to use this feature';
      state.isOpen = true;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setModal, activateUserOnlyModal, closeModal } = modalSlice.actions;
export const modalReducers = modalSlice.reducer;
