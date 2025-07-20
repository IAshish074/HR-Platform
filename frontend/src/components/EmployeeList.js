import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const EmployeeList = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      <Typography variant="body1">
        Employee list and management features will be implemented here.
      </Typography>
    </Paper>
  );
};

export default EmployeeList;
