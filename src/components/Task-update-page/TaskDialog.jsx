import React, { useState, useEffect } from "react";
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField
} from "@mui/material";
import { addTask, updateTask } from "./taskService";

const TaskDialog = ({ open, handleClose, task }) => {
  const [taskData, setTaskData] = useState({ date: "", description: "" });

  useEffect(() => {
    if (task) {
      setTaskData({ date: task.date, description: task.description });
    } else {
      setTaskData({ date: "", description: "" });
    }
  }, [task]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (task) {
      await updateTask(task.id, taskData);
    } else {
      await addTask(taskData);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Task Date"
          name="date"
          type="date"
          value={taskData.date}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Task Description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
