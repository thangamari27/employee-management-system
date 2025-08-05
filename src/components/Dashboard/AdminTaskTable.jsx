import * as React from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, Tooltip, TablePagination, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(id, taskName, finishHours, status, verification, teamName) {
  return { id, taskName, finishHours, status, verification, teamName };
}

const initialRows = [
  createData(1, 'Develop Login Module', 5, 'Completed', 'Verified', 'Backend Team'),
  createData(2, 'Design Home Page', 8, 'In Progress', 'Pending', 'Frontend Team'),
  createData(3, 'Fix API Bugs', 4, 'Pending', 'Not Verified', 'Backend Team'),
  createData(4, 'Optimize Database', 6, 'Completed', 'Verified', 'Database Team'),
  createData(5, 'Implement Authentication', 7, 'In Progress', 'Pending', 'Security Team'),
  createData(6, 'Setup CI/CD Pipeline', 9, 'Pending', 'Not Verified', 'DevOps Team'),
  createData(7, 'Create Dashboard UI', 10, 'Completed', 'Verified', 'Frontend Team'),
  createData(8, 'Integrate Payment Gateway', 12, 'In Progress', 'Pending', 'Payments Team'),
  createData(9, 'Write Unit Tests', 6, 'Completed', 'Verified', 'Testing Team'),
  createData(10, 'Deploy to Production', 5, 'Pending', 'Not Verified', 'DevOps Team'),
];

export default function AdminTaskTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows.map((row) => row.id));
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [...selected];
    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected = newSelected.filter((item) => item !== id);
    }
    setSelected(newSelected);
  };

  const handleDelete = () => {
    setRows(rows.filter((row) => !selected.includes(row.id)));
    setSelected([]);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <Typography variant="h5">Admin Task List</Typography>
          </Grid>
          {selected.length > 0 && (
            <Grid item>
              <Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>

        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {['Task Name', 'Finish Hours', 'Status', 'Verification', 'Team Name'].map((head, index) => (
                  <TableCell key={index} align="left">{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const isSelected = selected.includes(row.id);
                return (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    selected={isSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell component="th" scope="row">{row.taskName}</TableCell>
                    <TableCell align="left">{row.finishHours}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">{row.verification}</TableCell>
                    <TableCell align="left">{row.teamName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Paper>
    </Box>
  );
}
