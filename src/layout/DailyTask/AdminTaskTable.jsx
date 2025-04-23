import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Typography, Table, TableContainer,
  TableHead, TableRow, TableCell, TableBody, Chip, Button, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllTasks, addTask, deleteTask, updateTask, getUserRole } from "../../firebase/firebaseApi"; // Import getUserRole
import EditTaskDialog from "./EditTaskDialog";
import ViewTaskDialog from "./ViewTaskDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminTaskTable = () => { // Remove `userRole` prop
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [addDialogOpen, setAddDialogOpen] = useState(false); // State for Add Task dialog
  const [selectedTask, setSelectedTask] = useState(null); // State for selected task (view/edit)
  const [viewDialogOpen, setViewDialogOpen] = useState(false); // State for View Task dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State for Edit Task dialog
  const [newTask, setNewTask] = useState({
    task: "", date: "", description: "", status: "Pending", verified: "Pending"
  }); // State for new task data

  // Fetch all tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await getAllTasks(); // Fetch tasks from Firestore
        setTasks(fetchedTasks); // Update state with fetched tasks
      } catch (error) {
        toast.error("Error fetching tasks!");
      }
    };
    loadTasks();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => setSearchQuery(e.target.value.trim().toLowerCase());

  // Add Task
  const handleAddTask = async () => {
    const userRole = getUserRole(); // Fetch role from localStorage

    if (userRole !== "Admin" && userRole !== "Manager") {
      toast.error("❌ Only Admin or Manager can add tasks!");
      return;
    }

    if (!newTask.task || !newTask.date || !newTask.description) {
      toast.warning("Please fill all fields!");
      return;
    }

    try {
      const newTaskId = await addTask(newTask); // Add task to Firestore
      setTasks([...tasks, { id: newTaskId, ...newTask }]); // Update state with new task
      toast.success("Task added successfully!");
      setAddDialogOpen(false); // Close Add Task dialog
      setNewTask({ task: "", date: "", description: "", status: "Pending", verified: "Pending" }); // Reset new task form
    } catch (error) {
      toast.error("Error adding task!");
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId); // Delete task from Firestore
      setTasks(tasks.filter((task) => task.id !== taskId)); // Update state by removing the task
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task!");
    }
  };

  // Update Task
  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      await updateTask(taskId, updatedTask); // Update task in Firestore
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))); // Update state with modified task
      toast.success("Task updated successfully!");
      setEditDialogOpen(false); // Close Edit Task dialog
      setSelectedTask(null); // Reset selected task
    } catch (error) {
      toast.error("Error updating task!");
    }
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(searchQuery)
  );

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ maxWidth: 1200, mx: "auto" }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5">Task Assignments</Typography>
            <Button
              variant="contained"
              onClick={() => setAddDialogOpen(true)}
              disabled={getUserRole() !== "admin" && getUserRole() !== "manager"} // Use getUserRole
            >
              Add Task
            </Button>
          </Stack>
          <TextField
            fullWidth
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
            sx={{ mb: 2 }}
          />

          {/* Task Table */}
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><strong>S.No</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Task</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Verification</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
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
                        <Chip label={task.status} color={task.status === "Completed" ? "success" : "warning"} variant="outlined" sx={{ fontWeight: 600 }} />
                      </TableCell>
                      <TableCell>
                        <Chip label={task.verified} color={task.verified === "Verified" ? "success" : "error"} variant="outlined" sx={{ fontWeight: 600 }} />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => { setSelectedTask(task); setViewDialogOpen(true); }}>View</Button>
                        <Button onClick={() => { setSelectedTask(task); setEditDialogOpen(true); }}>Edit</Button>
                        <Button color="error" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" sx={{ color: "gray" }}>No tasks found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Task Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="Task Name" value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Task Date" type="date" InputLabelProps={{ shrink: true }} value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask} disabled={!newTask.task || !newTask.date || !newTask.description}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* View Task Dialog */}
      <ViewTaskDialog open={viewDialogOpen} handleClose={() => setViewDialogOpen(false)} task={selectedTask} />

      {/* Edit Task Dialog */}
      <EditTaskDialog
        open={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        task={selectedTask}
        onUpdate={handleUpdateTask}
      />
    </Box>
  );
};

export default AdminTaskTable;