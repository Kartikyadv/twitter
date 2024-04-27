// socketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
  },
});

export const {  } = socketSlice.actions;

export default socketSlice.reducer;
