import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingScreen: false,
};

export const setting = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateState: (state, action) => ({ ...state, ...action.payload }),
    resetState: () => initialState,
  },
});

export const { updateState, resetState } = setting.actions;

export default setting.reducer;
