import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  AvatarGroup,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Group as GroupIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Teams = () => {
  const [openDialog, setOpenDialog] = useState(false);
  
  const [teams] = useState([
    {
      id: 1,
      name: 'Engineering',
      description: 'Software development and technical operations',
      manager: 'John Doe',
      memberCount: 12,
      members: [
        { name: 'John Doe', role: 'Team Lead' },
        { name: 'Jane Smith', role: 'Senior Developer' },
        { name: 'Mike Johnson', role: 'Developer' },
        { name: 'Sarah Wilson', role: 'QA Engineer' }
      ],
      color: '#1976d2'
    },
    {
      id: 2,
      name: 'Human Resources',
      description: 'Employee relations and organizational development',
      manager: 'Emily Brown',
      memberCount: 5,
      members: [
        { name: 'Emily Brown', role: 'HR Manager' },
        { name: 'David Lee', role: 'Recruiter' },
        { name: 'Lisa Chen', role: 'HR Coordinator' }
      ],
      color: '#4caf50'
    },
    {
      id: 3,
      name: 'Marketing',
      description: 'Brand promotion and customer engagement',
      manager: 'Alex Turner',
      memberCount: 8,
      members: [
        { name: 'Alex Turner', role: 'Marketing Manager' },
        { name: 'Rachel Green', role: 'Content Creator' },
        { name: 'Tom Harris', role: 'Social Media Manager' }
      ],
      color: '#ff9800'
    },
    {
      id: 4,
      name: 'Finance',
      description: 'Financial planning and accounting',
      manager: 'Robert Davis',
      memberCount: 6,
      members: [
        { name: 'Robert Davis', role: 'Finance Manager' },
        { name: 'Maria Garcia', role: 'Accountant' },
        { name: 'James Miller', role: 'Financial Analyst' }
      ],
      color: '#9c27b0'
    }
  ]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const totalEmployees = teams.reduce((sum, team) => sum + team.memberCount, 0);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Teams Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          Create Team
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
                    Total Teams
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {teams.length}
                  </Typography>
                </Box>
                <GroupIcon sx={{ fontSize: 40, color: '#1976d2' }} />
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
                    Total Members
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {totalEmployees}
                  </Typography>
                </Box>
                <PersonIcon sx={{ fontSize: 40, color: '#4caf50' }} />
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
                    Avg Team Size
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {Math.round(totalEmployees / teams.length)}
                  </Typography>
                </Box>
                <GroupIcon sx={{ fontSize: 40, color: '#ff9800' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fce4ec', borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Active Projects
                  </Typography>
                  <Typography variant="h4" component="h2">
                    15
                  </Typography>
                </Box>
                <GroupIcon sx={{ fontSize: 40, color: '#e91e63' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Teams Grid */}
      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid item xs={12} md={6} lg={4} key={team.id}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: team.color,
                        width: 48,
                        height: 48,
                        mr: 2
                      }}
                    >
                      <GroupIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {team.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {team.memberCount} members
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {team.description}
                </Typography>

                <Box mb={2}>
                  <Typography variant="subtitle2" mb={1}>
                    Team Manager
                  </Typography>
                  <Chip
                    label={team.manager}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Box mb={2}>
                  <Typography variant="subtitle2" mb={1}>
                    Team Members
                  </Typography>
                  <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                    {team.members.map((member, index) => (
                      <Avatar
                        key={index}
                        sx={{ bgcolor: team.color, width: 32, height: 32 }}
                        title={`${member.name} - ${member.role}`}
                      >
                        {getInitials(member.name)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    {team.members.length} of {team.memberCount} shown
                  </Typography>
                  <Button size="small" variant="outlined">
                    View Team
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Team Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Team</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Team Name"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Team Manager"
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Team
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Teams;
