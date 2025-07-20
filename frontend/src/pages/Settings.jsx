import React, { useState } from 'react';
import {
  Box,
  Card,
  // CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Switch,
  // FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs
} from '@mui/material';
import {
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  // Language as LanguageIcon,
  VpnKey as VpnKeyIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Shield as ShieldIcon
} from '@mui/icons-material';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      leaveRequests: true,
      performanceReviews: true,
      systemUpdates: false,
      marketingEmails: false
    },
    privacy: {
      profileVisibility: 'team',
      showEmail: true,
      showPhone: false,
      showAddress: false
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password change logic here
    setShowAlert(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleExportData = () => {
    // Handle data export logic here
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    setDeleteDialog(false);
    console.log('Account deletion requested...');
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" mb={3}>
        Settings
      </Typography>

      <Card sx={{ borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<ShieldIcon />} label="Privacy" />
          <Tab icon={<PaletteIcon />} label="Preferences" />
        </Tabs>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Notification Preferences
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText 
                primary="Email Notifications" 
                secondary="Receive notifications via email" 
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onChange={() => handleNotificationChange('emailNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText 
                primary="Push Notifications" 
                secondary="Receive browser push notifications" 
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onChange={() => handleNotificationChange('pushNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText 
                primary="Leave Requests" 
                secondary="Notifications for leave request updates" 
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.leaveRequests}
                  onChange={() => handleNotificationChange('leaveRequests')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText 
                primary="Performance Reviews" 
                secondary="Notifications for performance review cycles" 
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.performanceReviews}
                  onChange={() => handleNotificationChange('performanceReviews')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText 
                primary="System Updates" 
                secondary="Notifications about system maintenance and updates" 
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.systemUpdates}
                  onChange={() => handleNotificationChange('systemUpdates')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Security Settings
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Change Password
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm New Password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      startIcon={<VpnKeyIcon />}
                      onClick={handlePasswordChange}
                    >
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Two-Factor Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Add an extra layer of security to your account
                </Typography>
                <Button variant="outlined" startIcon={<SecurityIcon />}>
                  Enable 2FA
                </Button>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Active Sessions
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Monitor and manage your active login sessions
                </Typography>
                <Button variant="outlined">
                  View Active Sessions
                </Button>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Privacy Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Privacy Settings
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon><ShieldIcon /></ListItemIcon>
              <ListItemText 
                primary="Show Email Address" 
                secondary="Allow other employees to see your email" 
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.privacy.showEmail}
                  onChange={() => handlePrivacyChange('showEmail')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem>
              <ListItemIcon><ShieldIcon /></ListItemIcon>
              <ListItemText 
                primary="Show Phone Number" 
                secondary="Allow other employees to see your phone number" 
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.privacy.showPhone}
                  onChange={() => handlePrivacyChange('showPhone')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem>
              <ListItemIcon><ShieldIcon /></ListItemIcon>
              <ListItemText 
                primary="Show Address" 
                secondary="Allow other employees to see your address" 
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.privacy.showAddress}
                  onChange={() => handlePrivacyChange('showAddress')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            Data Management
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportData}
                fullWidth
              >
                Export My Data
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteDialog(true)}
                fullWidth
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Preferences Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Preferences
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Theme"
                value={settings.preferences.theme}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, theme: e.target.value }
                }))}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Language"
                value={settings.preferences.language}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, language: e.target.value }
                }))}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Timezone"
                value={settings.preferences.timezone}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, timezone: e.target.value }
                }))}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Date Format"
                value={settings.preferences.dateFormat}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, dateFormat: e.target.value }
                }))}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </TextField>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      {/* Success Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <Alert onClose={() => setShowAlert(false)} severity="success">
          Password updated successfully!
        </Alert>
      </Snackbar>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
