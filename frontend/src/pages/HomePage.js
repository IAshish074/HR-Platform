import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  LinearProgress,
  Paper,
  IconButton,
  Button,
  Divider
} from '@mui/material';
import {
  People,
  PersonAdd,
  EventNote,
  TrendingUp,
  Schedule,
  CheckCircle,
  Warning,
  AttachMoney,
  Assessment,
  Notifications,
  MoreVert
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 245,
    newHires: 12,
    pendingLeaves: 8,
    activeProjects: 15,
    recentActivities: [
      { id: 1, action: 'New employee onboarded', user: 'John Smith', time: '2 hours ago', type: 'success' },
      { id: 2, action: 'Leave request submitted', user: 'Sarah Johnson', time: '4 hours ago', type: 'pending' },
      { id: 3, action: 'Performance review completed', user: 'Mike Wilson', time: '6 hours ago', type: 'success' },
      { id: 4, action: 'Document uploaded', user: 'Emily Davis', time: '8 hours ago', type: 'info' },
    ],
    upcomingEvents: [
      { id: 1, title: 'Team Meeting', date: 'Today, 2:00 PM', type: 'meeting' },
      { id: 2, title: 'Quarterly Review', date: 'Tomorrow, 10:00 AM', type: 'review' },
      { id: 3, title: 'Training Session', date: 'Dec 25, 9:00 AM', type: 'training' },
    ],
    departmentStats: [
      { name: 'Engineering', employees: 85, growth: 12 },
      { name: 'Marketing', employees: 45, growth: 8 },
      { name: 'Sales', employees: 60, growth: 15 },
      { name: 'HR', employees: 25, growth: 5 },
      { name: 'Finance', employees: 30, growth: 3 },
    ]
  });

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card 
      sx={{ 
        height: '100%', 
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        border: `1px solid ${color}30`,
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h3" component="div" color={color} fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar 
            sx={{ 
              bgcolor: color, 
              width: 56, 
              height: 56,
              boxShadow: `0 4px 20px ${color}40`
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const getActivityColor = (type) => {
    switch (type) {
      case 'success': return theme.palette.success.main;
      case 'pending': return theme.palette.warning.main;
      case 'info': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting': return theme.palette.primary.main;
      case 'review': return theme.palette.warning.main;
      case 'training': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Welcome Header */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          Welcome back, {user?.firstName || 'User'}! 👋
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here's what's happening in your organization today
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Employees" 
            value={dashboardData.totalEmployees}
            icon={<People />}
            color={theme.palette.primary.main}
            subtitle="+5% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="New Hires" 
            value={dashboardData.newHires}
            icon={<PersonAdd />}
            color={theme.palette.success.main}
            subtitle="This month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Pending Leaves" 
            value={dashboardData.pendingLeaves}
            icon={<EventNote />}
            color={theme.palette.warning.main}
            subtitle="Need approval"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Active Projects" 
            value={dashboardData.activeProjects}
            icon={<TrendingUp />}
            color={theme.palette.info.main}
            subtitle="In progress"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '400px' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Activities
                </Typography>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
                {dashboardData.recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: getActivityColor(activity.type) + '20',
                            color: getActivityColor(activity.type),
                            width: 40,
                            height: 40
                          }}
                        >
                          {activity.type === 'success' ? <CheckCircle /> : 
                           activity.type === 'pending' ? <Schedule /> : <Notifications />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight="medium">
                            {activity.action}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              by {activity.user}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < dashboardData.recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '400px' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Upcoming Events
                </Typography>
                <Button size="small" variant="outlined">
                  View All
                </Button>
              </Box>
              <List>
                {dashboardData.upcomingEvents.map((event, index) => (
                  <React.Fragment key={event.id}>
                    <ListItem alignItems="center" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: getEventColor(event.type),
                            width: 40,
                            height: 40
                          }}
                        >
                          {event.type === 'meeting' ? <People /> : 
                           event.type === 'review' ? <Assessment /> : <Schedule />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight="medium">
                            {event.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="textSecondary">
                            {event.date}
                          </Typography>
                        }
                      />
                      <Chip 
                        label={event.type}
                        size="small"
                        sx={{ 
                          bgcolor: getEventColor(event.type) + '20',
                          color: getEventColor(event.type),
                          textTransform: 'capitalize'
                        }}
                      />
                    </ListItem>
                    {index < dashboardData.upcomingEvents.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Department Statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Department Overview
              </Typography>
              <Grid container spacing={3}>
                {dashboardData.departmentStats.map((dept) => (
                  <Grid item xs={12} sm={6} md={2.4} key={dept.name}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.primary.main}05 100%)`
                      }}
                    >
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        {dept.employees}
                      </Typography>
                      <Typography variant="body1" fontWeight="medium" gutterBottom>
                        {dept.name}
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                        <TrendingUp 
                          sx={{ 
                            color: theme.palette.success.main, 
                            fontSize: 16, 
                            mr: 0.5 
                          }} 
                        />
                        <Typography 
                          variant="caption" 
                          color="success.main" 
                          fontWeight="medium"
                        >
                          +{dept.growth}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(dept.employees / dashboardData.totalEmployees) * 100}
                        sx={{ mt: 1, borderRadius: 2 }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;

