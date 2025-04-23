// src/pages/dashboard/AttendanceFilter.jsx
import React from "react";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";

const AttendanceFilter = ({ onFilterChange }) => {
  const [filter, setFilter] = React.useState("all");

  const handleChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      onFilterChange(newFilter);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <ToggleButtonGroup value={filter} exclusive onChange={handleChange} aria-label="attendance filter">
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="Present">Present</ToggleButton>
        <ToggleButton value="Absent">Absent</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default AttendanceFilter;
