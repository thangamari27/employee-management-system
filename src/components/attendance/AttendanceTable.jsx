// src/pages/dashboard/AttendanceTable.jsx
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";

const employeeData = [
  { id: 1, name: "John Doe", date: "2025-02-27", status: "Present" },
  { id: 2, name: "Jane Smith", date: "2025-02-27", status: "Absent" },
  { id: 3, name: "Mike Johnson", date: "2025-02-27", status: "Present" },
  { id: 4, name: "Emily Davis", date: "2025-02-27", status: "Absent" }
];

const AttendanceTable = ({ filter }) => {
  const filteredData = filter === "all" ? employeeData : employeeData.filter(emp => emp.status === filter);

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Employee Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.date}</TableCell>
              <TableCell>
                <Chip
                  label={employee.status}
                  color={employee.status === "Present" ? "success" : "error"}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
