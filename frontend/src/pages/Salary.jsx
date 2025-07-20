import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Avatar
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Receipt as ReceiptIcon,
  AccountBalance as BankIcon
} from '@mui/icons-material';

const Salary = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const [salaryData] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      position: 'Software Developer',
      basicSalary: 75000,
      allowances: 15000,
      deductions: 8000,
      netSalary: 82000,
      payDate: '2024-01-31',
      status: 'paid'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Jane Smith',
      position: 'HR Manager',
      basicSalary: 85000,
      allowances: 20000,
      deductions: 12000,
      netSalary: 93000,
      payDate: '2024-01-31',
      status: 'paid'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Mike Johnson',
      position: 'Marketing Executive',
      basicSalary: 55000,
      allowances: 10000,
      deductions: 6000,
      netSalary: 59000,
      payDate: '2024-02-01',
      status: 'pending'
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    return status === 'paid' ? 'success' : 'warning';
  };

  const filteredSalaryData = salaryData.filter(salary =>
    salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = salaryData.reduce((sum, salary) => sum + salary.netSalary, 0);
  const paidAmount = salaryData.filter(s => s.status === 'paid').reduce((sum, salary) => sum + salary.netSalary, 0);
  const pendingAmount = salaryData.filter(s => s.status === 'pending').reduce((sum, salary) => sum + salary.netSalary, 0);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Salary Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={{ borderRadius: 2 }}
        >
          Export Payroll
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
                    Total Payroll
                  </Typography>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    ${totalPayroll.toLocaleString()}
                  </Typography>
                </Box>
                <MoneyIcon sx={{ fontSize: 40, color: '#1976d2' }} />
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
                    Paid Amount
                  </Typography>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    ${paidAmount.toLocaleString()}
                  </Typography>
                </Box>
                <BankIcon sx={{ fontSize: 40, color: '#4caf50' }} />
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
                    Pending Amount
                  </Typography>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    ${pendingAmount.toLocaleString()}
                  </Typography>
                </Box>
                <ReceiptIcon sx={{ fontSize: 40, color: '#ff9800' }} />
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
                    Avg. Salary
                  </Typography>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    ${Math.round(totalPayroll / salaryData.length).toLocaleString()}
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          {/* Search and Tabs */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="All Salaries" />
              <Tab label="Paid" />
              <Tab label="Pending" />
            </Tabs>
            
            <TextField
              variant="outlined"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Salary Table */}
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell>Allowances</TableCell>
                  <TableCell>Deductions</TableCell>
                  <TableCell>Net Salary</TableCell>
                  <TableCell>Pay Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSalaryData
                  .filter(salary => {
                    if (tabValue === 1) return salary.status === 'paid';
                    if (tabValue === 2) return salary.status === 'pending';
                    return true;
                  })
                  .map((salary) => (
                  <TableRow key={salary.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          sx={{ mr: 2, bgcolor: 'primary.main', width: 40, height: 40 }}
                        >
                          {getInitials(salary.employeeName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {salary.employeeName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{salary.employeeId}</TableCell>
                    <TableCell>{salary.position}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        ${salary.basicSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="success.main">
                        +${salary.allowances.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="error.main">
                        -${salary.deductions.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="primary.main">
                        ${salary.netSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(salary.payDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                        color={getStatusColor(salary.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                      >
                        Payslip
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

export default Salary;
