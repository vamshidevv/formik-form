import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  localStorage.setItem("reduxState", serializedState);
});

export default store;