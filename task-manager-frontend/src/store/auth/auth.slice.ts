import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { authStoreKey } from "./auth.const";
import {
  loginWithCredentials,
  registerWithCredentials,
} from "./auth.thunks";

export interface AuthState {
  authLoading: boolean;
  token: string | null;
}

const initialState: AuthState = {
    authLoading: false,
    token: null
};

export const authSlice = createSlice({
  name: authStoreKey,
  initialState,
  reducers: {
    updateAxiosToken: (_, action) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload}`;
    },
    updateAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    // loginWithCredentials
    builder.addCase(loginWithCredentials.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(loginWithCredentials.rejected, (state) => {
      state.authLoading = false;
    });
    builder.addCase(loginWithCredentials.fulfilled, (state) => {
      state.authLoading = false;
    });
    // registerWithCredentials
    builder.addCase(registerWithCredentials.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(registerWithCredentials.rejected, (state) => {
      state.authLoading = false;
    });
    builder.addCase(registerWithCredentials.fulfilled, (state) => {
      state.authLoading = false;
    });
  },
});

export const { updateAxiosToken, updateAuthLoading, updateToken } = authSlice.actions;