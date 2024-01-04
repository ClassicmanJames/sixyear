import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "Hello Test",
};

export const information = createSlice({
  name: "test",
  initialState,
  reducers: {
    updateState: (state, action) => ({ ...state, ...action.payload }),
    resetState: () => initialState,
  },
});

export const { updateState, resetState } = information.actions;

export default information.reducer;
