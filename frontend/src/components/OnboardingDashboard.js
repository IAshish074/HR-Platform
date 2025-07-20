import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const OnboardingDashboard = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee Onboarding
      </Typography>
      <Typography variant="body1">
        Onboarding management features will be implemented here.
      </Typography>
    </Paper>
  );
};

export default OnboardingDashboard;
