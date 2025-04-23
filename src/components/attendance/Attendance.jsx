// src/pages/dashboard/Attendance.jsx
import React, { useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import AttendanceTable from "./AttendanceTable";
import AttendanceFilter from "./AttendanceFilter";

const Attendance = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
        Employee Attendance
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <AttendanceFilter onFilterChange={handleFilterChange} />
        <AttendanceTable filter={filter} />
      </Paper>
    </Container>
  );
};

export default Attendance;
