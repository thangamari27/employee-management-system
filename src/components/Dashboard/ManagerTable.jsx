import React, { useState } from 'react';
import {
  List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider,
  Collapse, IconButton, Box, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Sample Manager Data with Teams
const managers = [
  { 
    name: 'John Doe', role: 'Project Manager', gender: 'male', 
    teams: ['Backend Team', 'Frontend Team'] 
  },
  { 
    name: 'Jane Smith', role: 'Senior Manager', gender: 'female', 
    teams: ['UI/UX Team', 'QA Team'] 
  },
  { 
    name: 'Michael Johnson', role: 'Tech Lead', gender: 'male', 
    teams: ['DevOps Team', 'Security Team'] 
  },
  { 
    name: 'Jane Smith', role: 'Senior Manager', gender: 'female', 
    teams: ['UI/UX Team', 'QA Team'] 
  }
];

// Function to get Material-UI avatars based on gender
const getAvatar = (gender) => {
  return gender === 'male'
    ? 'https://mui.com/static/images/avatar/1.jpg'
    : 'https://mui.com/static/images/avatar/3.jpg';
};

export default function ManagerTable() {
  const [openManagers, setOpenManagers] = useState({});

  const handleToggle = (index) => {
    setOpenManagers((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 2, p: 2 ,
        bgcolor: '#ffffff', // Light gray background
        borderRadius: 1, // Rounded corners for box
        boxShadow: 1 // Soft shadow effect
    }}>
      <Typography variant="h5" sx={{ textAlign: 'left', mb: 2 }}>Manager List</Typography>
      <List>
        {managers.map((manager, index) => (
          <Paper key={index} elevation={3} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            <ListItem 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                bgcolor: '#f5f5f5', 
                px: 2 
              }}
            >
              <ListItemAvatar>
                <Avatar src={getAvatar(manager.gender)} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="bold">
                    {manager.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {manager.role}
                  </Typography>
                }
              />
              <IconButton onClick={() => handleToggle(index)}>
                {openManagers[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </ListItem>
            <Collapse in={openManagers[index]} timeout="auto" unmountOnExit>
              <List sx={{ bgcolor: '#ffffff', borderTop: '1px solid #ddd', py: 1 }}>
                {manager.teams.map((team, i) => (
                  <ListItem 
                    key={i} 
                    sx={{ 
                      pl: 4, 
                      py: 1, 
                      borderBottom: i !== manager.teams.length - 1 ? '1px solid #eee' : 'none'
                    }}
                  >
                    <ListItemText 
                      primary={
                        <Typography variant="body2" fontWeight="bold">
                          {team}
                        </Typography>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Paper>
        ))}
      </List>
    </Box>
  );
}
