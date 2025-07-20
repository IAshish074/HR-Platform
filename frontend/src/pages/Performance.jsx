import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Star as StarIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const Performance = () => {
  const [tabValue, setTabValue] = useState(0);

  const [performanceData] = useState([
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      overallRating: 4.5,
      goals: 8,
      completedGoals: 6,
      reviewDate: '2024-01-15',
      status: 'completed',
      manager: 'Sarah Wilson'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      overallRating: 4.2,
      goals: 5,
      completedGoals: 4,
      reviewDate: '2024-01-20',
      status: 'in-progress',
      manager: 'Mike Johnson'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Marketing',
      overallRating: 3.8,
      goals: 6,
      completedGoals: 3,
      reviewDate: '2024-02-01',
      status: 'pending',
      manager: 'Emily Brown'
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'error';
      default: return 'default';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const avgRating = performanceData.reduce((sum, perf) => sum + perf.overallRating, 0) / performanceData.length;
  const totalGoals = performanceData.reduce((sum, perf) => sum + perf.goals, 0);
  const completedGoals = performanceData.reduce((sum, perf) => sum + perf.completedGoals, 0);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Performance Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          New Review
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd', borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Average Rating
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h4" component="h2" mr={1}>
                      {avgRating.toFixed(1)}
                    </Typography>
                    <StarIcon color="primary" />
                  </Box>
                </Box>
                <AssessmentIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e8', borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Goal Completion
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {Math.round((completedGoals / totalGoals) * 100)}%
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#4caf50' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0', borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Reviews
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {performanceData.length}
                  </Typography>
                </Box>
                <AssignmentIcon sx={{ fontSize: 40, color: '#ff9800' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5', borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Pending Reviews
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {performanceData.filter(p => p.status === 'pending').length}
                  </Typography>
                </Box>
                <AssignmentIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="All Reviews" />
            <Tab label="Pending" />
            <Tab label="In Progress" />
            <Tab label="Completed" />
          </Tabs>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Overall Rating</TableCell>
                  <TableCell>Goals Progress</TableCell>
                  <TableCell>Review Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {performanceData
                  .filter(performance => {
                    if (tabValue === 1) return performance.status === 'pending';
                    if (tabValue === 2) return performance.status === 'in-progress';
                    if (tabValue === 3) return performance.status === 'completed';
                    return true;
                  })
                  .map((performance) => (
                  <TableRow key={performance.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          sx={{ mr: 2, bgcolor: 'primary.main' }}
                        >
                          {getInitials(performance.employeeName)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {performance.employeeName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {performance.employeeId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{performance.department}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Rating value={performance.overallRating} readOnly size="small" />
                        <Typography variant="body2" ml={1}>
                          ({performance.overallRating})
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="body2">
                            {performance.completedGoals}/{performance.goals} Goals
                          </Typography>
                          <Typography variant="body2">
                            {Math.round((performance.completedGoals / performance.goals) * 100)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(performance.completedGoals / performance.goals) * 100}
                          sx={{ height: 6, borderRadius: 1 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(performance.reviewDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={performance.status.charAt(0).toUpperCase() + performance.status.slice(1).replace('-', ' ')}
                        color={getStatusColor(performance.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{performance.manager}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Performance;
