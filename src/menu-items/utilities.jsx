// assets
import { CheckOutlined, EditOutlined, ClockCircleOutlined } from '@ant-design/icons';

// icons
const icons = {
  CheckOutlined,
  EditOutlined,
  ClockCircleOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'Tasks',
  title: 'Task Management',
  type: 'group',
  children: [
    {
      id: 'task-checking',
      title: 'Task Checking',
      type: 'item',
      url: '/dashboard/TaskTable',
      icon: icons.CheckOutlined
    },
    {
      id: 'task-update',
      title: 'Task Update',
      type: 'item',
      url: '/dashboard/TaskUpdate',
      icon: icons.EditOutlined
    },
    {
      id: 'attendance',
      title: 'Attendance',
      type: 'item',
      url: '/dashboard/Attendance',
      icon: icons.ClockCircleOutlined
    }
  ]
};

export default utilities;
