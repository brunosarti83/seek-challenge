import { RootState } from "..";

const tasksLoading = (state: RootState) => state.tasks.tasksLoading;
const tasks = (state: RootState) => state.tasks.tasks;

export const tasksSelectors = {
    tasksLoading,
    tasks
};