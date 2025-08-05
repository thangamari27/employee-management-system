import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

// Import Auth Context
import { useAuth } from '../../../../../contexts/AuthContext';

export default function ProfileTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from AuthContext

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    if (path) {
      navigate(path);
    }
  };

  const handleLogoutClick = async () => {
    await logout(); // Call logout function
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      {/* Profile Route */}
      <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3, '/dashboard/profile')}>
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      
      {/* Logout (Trigger Logout Function) */}
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogoutClick}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
