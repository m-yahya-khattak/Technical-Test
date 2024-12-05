import { createReducer } from "@reduxjs/toolkit";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
  updateUserStart,
  updateUserSuccess,
  updateUserError,
} from "./actions";

interface UserState {
  user: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload || null; // Ensure payload is handled safely
    })
    .addCase(fetchUserError, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Unknown error"; // Handle undefined payload
    })
    .addCase(updateUserStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserSuccess, (state, action) => {
      state.loading = false;
      if (action.payload && typeof action.payload === "object") {
        state.user = state.user
          ? { ...state.user, ...action.payload }
          : { ...action.payload }; // Spread safely
      }
    })
    .addCase(updateUserError, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error occurred"; // Handle undefined payload
    });
});

export default userReducer;
