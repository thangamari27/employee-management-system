import { Container, Grid, Paper, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import { ToastContainer } from 'react-toastify';

const ProfilePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <ToastContainer />
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Grid container spacing={3}>
          {/* Left Side - Profile Card */}
          <Grid item xs={12} md={4}>
            <ProfileCard />
          </Grid>

          {/* Right Side - Profile Form */}
          <Grid item xs={12} md={8}>
            <ProfileForm />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
