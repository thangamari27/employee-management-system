import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack
} from "@mui/material";

const ViewTaskDialog = ({ open, handleClose, task }) => {
  if (!task) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" sx={{ color: "gray", textAlign: "center" }}>Task not found.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Typography variant="subtitle1">
            <strong>Task Name:</strong> {task.task || "N/A"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Task Status:</strong> {task.status || "N/A"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Verified Status:</strong> {task.verified || "N/A"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Description:</strong> {task.description || "N/A"}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTaskDialog;
