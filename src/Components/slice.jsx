// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: [],
  },
  reducers: {
    addFormData: (state, action) => {
      state.formData.push(action.payload);
    },
    removeFormData: (state, action) => {
      state.formData.splice(action.payload, 1);
    },
    updateFormData: (state, action) => {
      const { index, updatedData } = action.payload;
      state.formData[index] = updatedData;
    },
  },
});

export const { addFormData, removeFormData, updateFormData } = formSlice.actions;

export default formSlice.reducer;
