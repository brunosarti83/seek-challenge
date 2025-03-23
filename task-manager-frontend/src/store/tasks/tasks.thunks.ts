import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { tasksStoreKey } from "./tasks.const";
import { logoutUser } from "../auth";
import { Task } from "./tasks.slice";

const basePath = "https://k9qeiudz2k.execute-api.us-east-1.amazonaws.com/dev";
const tasksPath = `${basePath}/tasks`;

export const getTasks = createAsyncThunk(
    `${tasksStoreKey}/getTasks`,
    async (_, thunkApi) => {
      try {
        const response = await axios.get(`${tasksPath}`);
        if (response.status === 403 || response.status === 401) {
            thunkApi.dispatch(logoutUser());
        } else if (response.status !== 200) throw new Error();
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false };
      }
    }
);

export const createTask = createAsyncThunk(
    `${tasksStoreKey}/createTask`,
    async (data: Partial<Task>, thunkApi) => {
      try {
        const response = await axios.post(`${tasksPath}`, data);
        if (response.status === 201) {
            thunkApi.dispatch(getTasks());
        } else if (response.status === 403 || response.status === 401) {
            thunkApi.dispatch(logoutUser());
        } else throw new Error();
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false };
      }
    }
);

export const updateTask = createAsyncThunk(
    `${tasksStoreKey}/updateTask`,
    async (data: Partial<Task>, thunkApi) => {
      try {
        const { id, ...rest } = data
        const response = await axios.put(`${tasksPath}/${data.id}`, rest);
        if (response.status === 200) {
            thunkApi.dispatch(getTasks());
        } else if (response.status === 403 || response.status === 401) {
            thunkApi.dispatch(logoutUser());
        } else throw new Error();
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false };
      }
    }
);

export const deleteTask = createAsyncThunk(
    `${tasksStoreKey}/deleteTask`,
    async (data: Partial<Task>, thunkApi) => {
      try {
        const { id } = data
        const response = await axios.delete(`${tasksPath}/${id}`);
        if (response.status === 204) {
            thunkApi.dispatch(getTasks());
        } else if (response.status === 403 || response.status === 401) {
            thunkApi.dispatch(logoutUser());
        } else throw new Error();
        return { success: true, data: { id, status: 'deleted' } };
      } catch (error) {
        return { success: false };
      }
    }
);