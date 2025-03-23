import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, LinearProgress, Divider } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { createTask, tasksSelectors } from "../store/tasks";

const TasksList = React.memo(() => {
  const dispatch = useDispatch();  
  const tasks = useTasks();
  const [open, setOpen] = useState(false);
  const tasksLoading = useSelector(tasksSelectors.tasksLoading);
  const [taskData, setTaskData] = useState({ title: "", description: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTaskData({ title: "", description: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success } = await dispatch(createTask(taskData) as any).unwrap();
    if (success) handleClose();
  };

  return (
    <Stack sx={{ width: "100%", justifyContent: "center", alignItems: "center", gap: 1, pb: "40px", px: { md: 2 } }}>
      <Divider sx={{ width: "100%" }} />
      <Stack direction="row" sx={{ width: "100%", justifyContent: "center", alignItems: "center", my: 2, py: 2 }}>
        <Button
          onClick={handleOpen}
          sx={{ minWidth: "160px", minHeight: "60px", ml: "auto", backgroundColor: "rgb(250, 250, 250)" }}
        >
          Add New Task
        </Button>
      </Stack>
      <Divider sx={{ width: "100%", mb: 2 }} />
      { !tasks && tasksLoading && <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />}  
      {tasks?.map((task) => (
        <TaskCard key={task?.id} task={task} />
      ))}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} component="form" onSubmit={handleSubmit} sx={{ mt: 2, p: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={handleClose} color="secondary" sx={{ px: { xs: 3, md: 4 }, py: 2, m: 2 }}>
            Cancel
          </Button>
          <Button loading={tasksLoading} type="submit" onClick={handleSubmit} variant="contained" sx={{ px: { xs: 3, md: 4 }, py: 2, m: 2 }}>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
});

TasksList.displayName = "TasksList";
export default TasksList;
