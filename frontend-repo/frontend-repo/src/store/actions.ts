import { createAction } from "@reduxjs/toolkit";

interface UserPayload {
  [key: string]: any; // Generic key-value pair for user updates
}

export const loginUserStart = createAction("LOGIN_USER_START");
export const loginUserSuccess = createAction<UserPayload>("LOGIN_USER_SUCCESS");
export const loginUserError = createAction<string>("LOGIN_USER_ERROR");

export const logoutUser = createAction("LOGOUT_USER");

export const fetchUserStart = createAction("FETCH_USER_START");
export const fetchUserSuccess = createAction<UserPayload | null>("FETCH_USER_SUCCESS");
export const fetchUserError = createAction<string>("FETCH_USER_ERROR");

export const updateUserStart = createAction("UPDATE_USER_START");
export const updateUserSuccess = createAction<UserPayload>("UPDATE_USER_SUCCESS");
export const updateUserError = createAction<string>("UPDATE_USER_ERROR");
