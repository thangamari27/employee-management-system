// TaskTable.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Stack,
  TextField
} from "@mui/material";
import EditTaskDialog from "./EditTaskDialog";
import ViewTaskDialog from "./ViewTaskDialog";

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    { id: 1, date: "24 Feb 2025", task: "Email Sender", status: "Completed", verified: "Pending" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const handleEditOpen = (task) => { setSelectedTask(task); setEditOpen(true); };
  const handleViewOpen = (task) => { setSelectedTask(task); setViewOpen(true); };
  const handleEditClose = () => setEditOpen(false);
  const handleViewClose = () => setViewOpen(false);

  const filteredTasks = tasks.filter(task =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ maxWidth: 1200, mx: "auto" }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>Daily Task</Typography>
          <TextField
            fullWidth
            label="Search Task"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><strong>S.No</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Task</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Verification</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <TableRow key={task.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>
                        <Chip label={task.status} color={task.status === "Completed" ? "success" : "warning"} variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip label={task.verified} color={task.verified === "Verified" ? "success" : "error"} variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button variant="contained" size="small" onClick={() => handleEditOpen(task)}>Edit</Button>
                          <Button variant="outlined" size="small" onClick={() => handleViewOpen(task)}>View</Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No tasks found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedTask && (
            <>
              <EditTaskDialog open={editOpen} handleClose={handleEditClose} task={selectedTask} />
              <ViewTaskDialog open={viewOpen} handleClose={handleViewClose} task={selectedTask} />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskTable;
