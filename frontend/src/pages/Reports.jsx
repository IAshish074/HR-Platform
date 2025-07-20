import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import {
  Download as DownloadIcon,
  Assessment as AssessmentIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('employee-summary');

  const reportTypes = [
    { value: 'employee-summary', label: 'Employee Summary' },
    { value: 'attendance', label: 'Attendance Report' },
    { value: 'salary', label: 'Salary Report' },
    { value: 'performance', label: 'Performance Report' },
    { value: 'leaves', label: 'Leave Report' }
  ];

  const sampleData = [
    {
      department: 'Engineering',
      totalEmployees: 12,
      activeEmployees: 11,
      avgSalary: 75000,
      avgPerformance: 4.2,
      turnoverRate: '8%'
    },
    {
      department: 'Human Resources',
      totalEmployees: 5,
      activeEmployees: 5,
      avgSalary: 65000,
      avgPerformance: 4.5,
      turnoverRate: '0%'
    },
    {
      department: 'Marketing',
      totalEmployees: 8,
      activeEmployees: 7,
      avgSalary: 55000,
      avgPerformance: 4.0,
      turnoverRate: '12%'
    },
    {
      department: 'Finance',
      totalEmployees: 6,
      activeEmployees: 6,
      avgSalary: 70000,
      avgPerformance: 4.3,
      turnoverRate: '5%'
    }
  ];

  const quickStats = [
    {
      title: 'Total Reports Generated',
      value: '127',
      change: '+12%',
      color: '#1976d2',
      icon: <AssessmentIcon />
    },
    {
      title: 'Monthly Downloads',
      value: '45',
      change: '+8%',
      color: '#4caf50',
      icon: <DownloadIcon />
    },
    {
      title: 'Active Dashboards',
      value: '8',
      change: '+2%',
      color: '#ff9800',
      icon: <PieChartIcon />
    },
    {
      title: 'Scheduled Reports',
      value: '15',
      change: '+5%',
      color: '#9c27b0',
      icon: <TimelineIcon />
    }
  ];

  const handleReportChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const handleExport = () => {
    // Export functionality would go here
    console.log('Exporting report:', selectedReport);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Reports & Analytics
        </Typography>
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Report Type</InputLabel>
            <Select
              value={selectedReport}
              label="Report Type"
              onChange={handleReportChange}
            >
              {reportTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            sx={{ borderRadius: 2 }}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} mb={3}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="h2" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Chip
                      label={stat.change}
                      color="success"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box sx={{ color: stat.color, fontSize: 40 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Department Summary */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Department Summary Report
              </Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Department</strong></TableCell>
                      <TableCell><strong>Total Staff</strong></TableCell>
                      <TableCell><strong>Active Staff</strong></TableCell>
                      <TableCell><strong>Avg. Salary</strong></TableCell>
                      <TableCell><strong>Avg. Performance</strong></TableCell>
                      <TableCell><strong>Turnover Rate</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sampleData.map((dept, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {dept.department}
                          </Typography>
                        </TableCell>
                        <TableCell>{dept.totalEmployees}</TableCell>
                        <TableCell>{dept.activeEmployees}</TableCell>
                        <TableCell>
                          <Typography variant="body2" color="primary.main" fontWeight="bold">
                            ${dept.avgSalary.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={dept.avgPerformance}
                            color={dept.avgPerformance >= 4.0 ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={dept.turnoverRate}
                            color={parseFloat(dept.turnoverRate) < 10 ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Reports */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Recent Reports
              </Typography>
              <Box>
                {[
                  { name: 'Monthly Attendance Report', date: '2024-01-31', type: 'Attendance' },
                  { name: 'Q4 Performance Review', date: '2024-01-28', type: 'Performance' },
                  { name: 'Salary Analysis Report', date: '2024-01-25', type: 'Salary' },
                  { name: 'Leave Balance Report', date: '2024-01-22', type: 'Leave' },
                  { name: 'Employee Turnover Analysis', date: '2024-01-20', type: 'Analytics' }
                ].map((report, index) => (
                  <Box key={index} mb={2} p={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {report.name}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(report.date).toLocaleDateString()}
                      </Typography>
                      <Chip label={report.type} size="small" variant="outlined" />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Placeholder */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Analytics Dashboard
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: 300,
                  bgcolor: '#f5f5f5',
                  borderRadius: 1,
                  border: '2px dashed #ccc'
                }}
              >
                <Box textAlign="center">
                  <BarChartIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Interactive Charts Coming Soon
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Employee metrics, trends, and analytics will be displayed here
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
