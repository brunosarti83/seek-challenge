import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authStoreKey } from "./auth.const";
import { updateAxiosToken, updateToken } from "./auth.slice";
import Cookies from "universal-cookie";

const basePath = "https://k9qeiudz2k.execute-api.us-east-1.amazonaws.com/dev";
const authPath = `${basePath}`;

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
}

const cookies = new Cookies();

export const logoutUser = createAsyncThunk(
  `${authStoreKey}/logoutUser`,
  async (_, thunkApi) => {
    try {
      cookies.remove("token", {
        path: "/",
      });
      thunkApi.dispatch(updateAxiosToken(null));
      thunkApi.dispatch(updateToken(null));
      window.location.href = "/auth/login";
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
);

export const loginWithCredentials = createAsyncThunk(
  `${authStoreKey}/loginWithCredentials`,
  async (data: ILogin, thunkApi) => {
    try {
      const response = await axios.post(`${authPath}/login`, data);
      console.log(response)
      if (response.status === 200 && (response.data as any).token) {
        thunkApi.dispatch(updateAxiosToken((response.data as any).token));
        thunkApi.dispatch(updateToken((response.data as any).token));
        cookies.set("token", (response.data as any).token, {
          path: "/",
          expires: new Date(Date.now() + 59 * 60 * 1000),
        });
      } else throw new Error();
      return { success: true, message: "succesfull login" };
    } catch (error) {
      return { success: false };
    }
  }
);

export const registerWithCredentials = createAsyncThunk(
  `${authStoreKey}/registerWithCredentials`,
  async (data: IRegister, thunkApi) => {
    try {
      const response = await axios.post(`${authPath}/register`, data);
      if (response.status === 201 && (response.data as any).token) {
        thunkApi.dispatch(updateAxiosToken((response.data as any).token));
        thunkApi.dispatch(updateToken((response.data as any).token));
        cookies.set("token", (response.data as any).token, {
          path: "/",
          expires: new Date(Date.now() + 59 * 60 * 1000),
        });
      } else throw new Error();
      return { success: true, message: "succesfull registration" };
    } catch (error) {
      return { success: false };
    }
  }
);
