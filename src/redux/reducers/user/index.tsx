import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateState: (state, action) => ({ ...state, ...action.payload }),
    resetState: () => initialState,
  },
});

export const { updateState, resetState } = user.actions;

export default user.reducer;
