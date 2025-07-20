import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Stepper, Step, StepLabel } from '@mui/material';

const Onboarding = () => {
  const steps = ['Personal Information', 'Job Details', 'Document Verification'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6">Enter your personal information</Typography>
            <TextField fullWidth label="First Name" margin="normal" variant="outlined" />
            <TextField fullWidth label="Last Name" margin="normal" variant="outlined" />
            <TextField fullWidth label="Email Address" margin="normal" variant="outlined" />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6">Enter your job details</Typography>
            <TextField fullWidth label="Position" margin="normal" variant="outlined" />
            <TextField fullWidth label="Department" margin="normal" variant="outlined" />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Upload your documents for verification</Typography>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Employee Onboarding
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <Box sx={{ mt: 2 }}>
            <Typography>All steps completed - you're finished!</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Box>
        ) : (
          <Box>
            {getStepContent(activeStep)}
            <Box sx={{ mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Onboarding;

