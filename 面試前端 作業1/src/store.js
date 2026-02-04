import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    disabled: false,
  },
  reducers: {
    increment: (state) => {
      if (!state.disabled) {
        state.value += 1;
      }
    },
    clear: (state) => {
      state.value = 0;
    },
    toggleDisable: (state) => {
      state.disabled = !state.disabled;
    },
  },
});

export const { increment, clear, toggleDisable } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
