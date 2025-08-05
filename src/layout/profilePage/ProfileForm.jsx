import { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, MenuItem, Typography } from "@mui/material";
import { fetchUserProfile, updateUserProfile } from "../../api/profileTabApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    employeeId: "",
    department: "",
    designation: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    role: "",
  });

  // Function to generate a unique Employee ID (only if missing)
  const generateEmployeeId = () => `EMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await fetchUserProfile();
        if (userData) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...userData,
            employeeId: userData.employeeId || generateEmployeeId(), // Assign if missing
          }));
        }
      } catch (error) {
        toast.error("Failed to load profile data.", { position: "top-right", autoClose: 3000 });
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const success = await updateUserProfile(profile);
      if (success) {
        toast.success("Profile updated successfully!", { position: "top-right", autoClose: 3000 });
      } else {
        toast.error("Profile update failed. Please try again.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper", maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        Profile
      </Typography>

      <Grid container spacing={2}>
        {/* Employee ID (Auto-generated and Permanent) */}
        <Grid item xs={12}>
          <TextField fullWidth label="Employee ID" name="employeeId" value={profile.employeeId} disabled />
        </Grid>

        {/* First Name */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} />
        </Grid>

        {/* Phone Number */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Phone Number" name="phone" value={profile.phone} onChange={handleChange} />
        </Grid>

        {/* Email Address (Cannot be changed) */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Email Address" name="email" value={profile.email} disabled />
        </Grid>

        {/* Department */}
        <Grid item xs={12} md={6}>
          <TextField select fullWidth label="Department" name="department" value={profile.department} onChange={handleChange}>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </TextField>
        </Grid>

        {/* Designation */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Designation" name="designation" value={profile.designation} onChange={handleChange} />
        </Grid>

        {/* Date of Birth */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Date of Birth" name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        </Grid>

        {/* Address */}
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={2} label="Address" name="address" value={profile.address} onChange={handleChange} />
        </Grid>

        {/* Update Button */}
        <Grid item xs={12}>
          <Button variant="contained" fullWidth color="primary" onClick={handleUpdate}>
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
