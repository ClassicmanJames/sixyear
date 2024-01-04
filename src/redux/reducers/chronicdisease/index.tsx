import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  etcdata: "",
  statusdiseasedata: "",
  diseasedata: [],
};

export const shop = createSlice({
  name: "Disease",
  initialState,
  reducers: {
    updateState: (state, action) => ({ ...state, ...action.payload }),
    resetState: () => initialState,
  },
});

export const { updateState, resetState } = shop.actions;

export default shop.reducer;
