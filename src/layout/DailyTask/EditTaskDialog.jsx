import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack
} from "@mui/material";

const EditTaskDialog = ({ open, handleClose, task }) => {
  const [taskData, setTaskData] = useState({ task: "", description: "", status: "Pending" });

  useEffect(() => {
    if (task) {
      setTaskData({ ...task });
    }
  }, [task]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Task:", taskData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Task Name"
            name="task"
            value={taskData.task}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Task Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            select
            label="Task Status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!taskData.task.trim()}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
