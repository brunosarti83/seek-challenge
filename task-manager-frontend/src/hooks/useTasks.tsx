import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, tasksSelectors } from "../store/tasks";

export const useTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelectors.tasks);  
  useEffect(() => {
    if (!tasks) {
        dispatch(getTasks() as any);
    }
  }, [dispatch, tasks]);
  return tasks;
};