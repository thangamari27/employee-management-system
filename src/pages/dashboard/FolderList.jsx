import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Sample Team Members Data
const teamMembers = [
    { name: 'John Doe', role: 'Project Manager', gender: 'male' },
    { name: 'Jane Smith', role: 'Frontend Developer', gender: 'female' },
    { name: 'Michael Johnson', role: 'Backend Developer', gender: 'male' },
    { name: 'Emily Davis', role: 'UI/UX Designer', gender: 'female' },
    { name: 'Robert Wilson', role: 'QA Engineer', gender: 'male' },
    { name: 'Sophia Martinez', role: 'DevOps Engineer', gender: 'female' }
  ];

// Function to get Material-UI default avatars based on gender
const getAvatar = (gender) => {
  return gender === 'male'
    ? 'https://mui.com/static/images/avatar/1.jpg' // Default Male Avatar
    : 'https://mui.com/static/images/avatar/3.jpg'; // Default Female Avatar
};

export default function FolderList() {
  return (
    <List>
      {teamMembers.map((member, index) => (
        <>
          <ListItem key={index} >
            <ListItemAvatar>
              <Avatar src={getAvatar(member.gender)} />
            </ListItemAvatar>
            <ListItemText
              primary={member.name}
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
              }
            />
          </ListItem>
          {index < teamMembers.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
}