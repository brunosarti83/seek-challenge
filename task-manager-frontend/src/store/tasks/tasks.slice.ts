import { createSlice } from "@reduxjs/toolkit";
import { tasksStoreKey } from "./tasks.const";
import { createTask, deleteTask, getTasks, updateTask } from "./tasks.thunks";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
}

export interface AuthState {
  tasksLoading: boolean;
  tasks: Task[] | null;
}

const initialState: AuthState = {
    tasksLoading: false,
    tasks: null,
};

export const tasksSlice = createSlice({
  name: tasksStoreKey,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    // getTasks
    builder.addCase(getTasks.pending, (state) => {
      state.tasksLoading = true;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.tasksLoading = false;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => { 
      state.tasks = action.payload.data as Task[];
      state.tasksLoading = false;
    });
    // createTask
    builder.addCase(createTask.pending, (state) => {
      state.tasksLoading = true;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.tasksLoading = false;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks = [ ...state.tasks, action.payload.data as Task ];   
      state.tasksLoading = false;
    });
    // updateTask
    builder.addCase(updateTask.pending, (state) => {
      state.tasksLoading = true;
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.tasksLoading = false;
    });
    builder.addCase(updateTask.fulfilled, (state) => {  
      state.tasksLoading = false;
    });
    // deleteTask
    builder.addCase(deleteTask.pending, (state) => {
      state.tasksLoading = true;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.tasksLoading = false;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks?.filter((task) => task.id !== action.payload.data.id);      
      state.tasksLoading = false;
    });
  },
});

// export const { updateAxiosToken, updateAuthLoading, updateToken } = authSlice.actions;