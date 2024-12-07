import { createReducer } from "@reduxjs/toolkit";
import {
  loginUserStart,
  loginUserSuccess,
  loginUserError,
  logoutUser,
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
    // Login actions
    .addCase(loginUserStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(loginUserError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Logout action
    .addCase(logoutUser, (state) => {
      state.user = null;
      state.error = null;
    })
    // Fetch actions
    .addCase(fetchUserStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(fetchUserError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Update actions
    .addCase(updateUserStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserSuccess, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.user = { ...state.user, ...action.payload };
      }
    })
    .addCase(updateUserError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default userReducer;
