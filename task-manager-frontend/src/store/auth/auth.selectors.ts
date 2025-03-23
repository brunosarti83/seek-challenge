import { RootState } from "..";

const authLoading = (state: RootState) => state.auth.authLoading;
const token = (state: RootState) => state.auth.token;

export const authSelectors = {
  authLoading,
  token
};