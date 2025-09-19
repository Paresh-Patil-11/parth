import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ScheduleForm from '../components/Forms/ScheduleForm';

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Contact Us
      </Typography>
      
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Schedule a consultation with our expert astrologer and discover what the stars have in store for you.
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <ScheduleForm />
      </Box>
    </Container>
  );
};

export default Contact;