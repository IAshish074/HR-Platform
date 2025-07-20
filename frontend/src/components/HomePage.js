import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>
        Welcome to the HR Dashboard
      </Typography>
      <Typography variant="body1">
        Use the navigation menu to explore available features.
      </Typography>
    </Box>
  );
};

export default HomePage;

