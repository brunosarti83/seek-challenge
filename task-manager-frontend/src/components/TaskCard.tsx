import React, { useState } from "react";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task, tasksSelectors, updateTask, deleteTask } from "../store/tasks";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  task: Task;
}

const TaskCard = React.memo(({ task }: IProps) => {
  const dispatch = useDispatch();
  const tasksLoading = useSelector(tasksSelectors.tasksLoading);

  const [taskStatus, setTaskStatus] = useState(task?.status);
  const [newStatus, setNewStatus] = useState<string | null>(null);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (taskStatus === event.target.value) return;
    setNewStatus(event.target.value as string);
    setOpenStatusDialog(true);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
    setNewStatus(null);
  };

  const handleConfirmStatusChange = async () => {
    const { success } = await dispatch(updateTask({ ...task, status: newStatus }) as any).unwrap();
    if (success) {
      setTaskStatus(newStatus);
      setNewStatus(null);
      setOpenStatusDialog(false);
    }
  };

  const handleDeleteTask = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    const { success } = await dispatch(deleteTask(task) as any).unwrap();
    if (success) {
      setOpenDeleteDialog(false);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto", 
        p: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-around",
        alignItems: "center",
        gap: 4,
        backgroundColor: "rgb(200, 200, 200)",
        borderRadius: "8px",
      }}
    >
      <Typography color="rgb(20,20,20)" sx={{ width: { xs: "100%", md: "20%" }, pl: 4 }}>
        {task?.title}
      </Typography>
      <Typography
        color="rgb(20,20,20)"
        sx={{
          width: { xs: "100%", md: "40%" },
          maxWidth: { md: "40%" },
          pl: 2,
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          overflow: "auto",
        }}
      >
        {task?.description}
      </Typography>

      <Stack direction="row" gap={4} sx={{ width: {xs: "100%", md: "fit-content" }, ml: "auto" }}>
        <FormControl>
            <InputLabel sx={{ backgroundColor: "rgb(200, 200, 200)", px: 1 }}>
            Status
            </InputLabel>
            <Select value={taskStatus} onChange={handleStatusChange as any} sx={{ minWidth: 160 }}>
            <MenuItem value={"todo"}>To Do</MenuItem>
            <MenuItem value={"in_progress"}>In Progress</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
        </FormControl>

        <Button onClick={handleDeleteTask} sx={{ ml: "auto", mr: 2 }}>
            <Delete />
        </Button>
      </Stack>  

      <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog} sx={{ mt: 2, p: 2 }}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to change the status to{" "}
            <b>{newStatus?.replace("_", " ").toUpperCase()}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog} color="secondary" sx={{ px: 4, py: 2, m: 2 }}>
            Cancel
          </Button>
          <Button
            loading={tasksLoading}
            onClick={handleConfirmStatusChange}
            variant="contained"
            sx={{ px: 4, py: 2, m: 2 }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} sx={{ mt: 2, p: 2 }}>
        <DialogTitle>Confirm Task Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to <b>delete</b> this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary" sx={{ px: 4, py: 2, m: 2 }}>
            Cancel
          </Button>
          <Button
            loading={tasksLoading}
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{ px: 4, py: 2, m: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
});

TaskCard.displayName = "TaskCard";
export default TaskCard;

