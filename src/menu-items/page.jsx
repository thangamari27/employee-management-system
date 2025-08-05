// assets
import { ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext'; // Import authentication context
import { useNavigate } from 'react-router-dom';

// icons
const icons = {
  ProfileOutlined,
  LogoutOutlined
};

// Logout handler function
const handleLogout = () => {
  const { logout } = useAuth();
  logout();
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'my-profile',
      title: 'My Profile',
      type: 'item',
      url: '/dashboard/profile', // Updated URL path
      icon: icons.ProfileOutlined
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '#',
      icon: icons.LogoutOutlined,
      onClick: handleLogout // Updated logout functionality
    }
  ]
};

export default pages;
