import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PeopleIcon from "@mui/icons-material/People";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

// Mapping icons dynamically
const iconMapping = {
  "Completed Tasks": <TrendingUpIcon sx={{ fontSize: 40, color: "green" }} />,
  "Total Tasks": <AssignmentTurnedInIcon sx={{ fontSize: 40, color: "blue" }} />,
  "Team Members": <PeopleIcon sx={{ fontSize: 40, color: "orange" }} />,
  "Pending Tasks": <HourglassEmptyIcon sx={{ fontSize: 40, color: "red" }} />,
};

export default function AnalyticAdmin({ title, count, extra }) {
  return (
    <Card sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      {iconMapping[title] || null}
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>{count}</Typography>
        <Typography color="text.secondary">{extra}</Typography>
      </CardContent>
    </Card>
  );
}

AnalyticAdmin.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  extra: PropTypes.string.isRequired,
};
