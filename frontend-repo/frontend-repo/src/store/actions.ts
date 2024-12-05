import { createAction } from "@reduxjs/toolkit";

interface UserPayload {
    [key: string]: any; // Generic key-value pair for user updates
  }
  
  interface ErrorPayload {
    message: string;
  }
  

export const fetchUserStart = createAction("FETCH_USER_START");
export const fetchUserSuccess = createAction<UserPayload>("FETCH_USER_SUCCESS");
export const fetchUserError = createAction<string>("FETCH_USER_ERROR");

export const updateUserStart = createAction("UPDATE_USER_START");
export const updateUserSuccess = createAction<UserPayload>("UPDATE_USER_SUCCESS");
export const updateUserError = createAction<string>("UPDATE_USER_ERROR");
