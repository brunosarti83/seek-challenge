import { configureStore } from "@reduxjs/toolkit";
import { authSlice, authStoreKey } from "./auth";
import { tasksSlice, tasksStoreKey } from "./tasks";


export const store = configureStore({
  reducer: {
    [authStoreKey]: authSlice.reducer,
    [tasksStoreKey]: tasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;