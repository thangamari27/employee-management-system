import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import taskService from "./taskService";

const TaskForm = ({ task, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({ date: "", description: "" });

  useEffect(() => {
    if (task) setFormData({ date: task.date, description: task.description });
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (task) {
      await taskService.updateTask(task.id, formData);
    } else {
      await taskService.addTask(formData);
    }
    onRefresh();
    onClose();
  };

  return (
    <div>
      <TextField name="date" label="Task Date" type="date" value={formData.date} onChange={handleChange} fullWidth />
      <TextField name="description" label="Task Description" value={formData.description} onChange={handleChange} fullWidth />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Save Changes
      </Button>
    </div>
  );
};

export default TaskForm;
