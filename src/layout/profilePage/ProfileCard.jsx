import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../api/profileTabApi";
import { Avatar, Box, Typography, Card, CardContent, Grid, Divider, Stack } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";

const ProfileCard = () => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userData = await fetchUserProfile();
      if (userData) setProfile(userData);
    };
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <Card sx={{ p: 3, textAlign: "center", boxShadow: 3, borderRadius: 3, bgcolor: "#f5f5f5" }}>
      {/* Profile Image */}
      <Avatar
        src="https://via.placeholder.com/150"
        alt="Employee"
        sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
      />

      {/* Employee Name & Role */}
      <Typography variant="h6" fontWeight="bold">
        {profile.firstname+""+profile.lastname}
      </Typography>
      <Typography color="textSecondary">{profile.role}</Typography>

      <Divider sx={{ my: 2 }} />

      {/* Responsive Employee Stats */}
      <CardContent>
        <Stack spacing={2}>
          {/* Total Projects */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#1976D2",
              color: "white",
              borderRadius: 2,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <WorkIcon fontSize="large" />
            <Box>
              <Typography fontSize={14} fontWeight="bold">
                Total Projects
              </Typography>
              <Typography fontSize={18}>0</Typography>
            </Box>
          </Box>

          {/* Completed Projects */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#4CAF50",
              color: "white",
              borderRadius: 2,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CheckCircleIcon fontSize="large" />
            <Box>
              <Typography fontSize={14} fontWeight="bold">
                Completed
              </Typography>
              <Typography fontSize={18}>0</Typography>
            </Box>
          </Box>

          {/* Pending Tasks */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#FF9800",
              color: "white",
              borderRadius: 2,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <AssignmentIcon fontSize="large" />
            <Box>
              <Typography fontSize={14} fontWeight="bold">
                Pending Tasks
              </Typography>
              <Typography fontSize={18}>0</Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
