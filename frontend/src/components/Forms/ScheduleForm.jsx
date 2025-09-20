import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Grid, MenuItem, Typography,
  Card, CardContent, CircularProgress, Alert, Dialog,
  DialogTitle, DialogContent, DialogActions, useTheme, useMediaQuery
} from '@mui/material';
import { CheckCircle, CalendarToday, Person } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import api from '../../services/api';

const ScheduleForm = ({ prefillRashi, prefillService, onSuccess }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);
  const [rashis, setRashis] = useState([]);
  const [successDialog, setSuccessDialog] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      dob: '',
      birth_time: '',
      birth_place: '',
      rashi: prefillRashi || '',
      service: prefillService || '',
      preferred_date: '',
      preferred_time: '',
      timezone: 'Asia/Kolkata',
      message: ''
    }
  });

  const services = [
    'Health Consultation',
    'Career Guidance',
    'Marriage Compatibility',
    'Financial Planning',
    'Compatibility Analysis',
    'Spiritual Guidance'
  ];

  const timezones = [
    'Asia/Kolkata',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Asia/Dubai',
    'Australia/Sydney'
  ];

  useEffect(() => {
    fetchRashis();
  }, []);

  const fetchRashis = async () => {
    try {
      const response = await api.get('/rashis');
      setRashis(response.data.data);
    } catch (error) {
      console.error('Error fetching rashis:', error);
      // Mock data for demo
      setRashis([
        { id: 1, name: 'Mesha (Aries)' },
        { id: 2, name: 'Vrishabha (Taurus)' },
        { id: 3, name: 'Mithuna (Gemini)' },
        { id: 4, name: 'Karka (Cancer)' },
        { id: 5, name: 'Simha (Leo)' },
        { id: 6, name: 'Kanya (Virgo)' },
        { id: 7, name: 'Tula (Libra)' },
        { id: 8, name: 'Vrischika (Scorpio)' },
        { id: 9, name: 'Dhanu (Sagittarius)' },
        { id: 10, name: 'Makara (Capricorn)' },
        { id: 11, name: 'Kumbha (Aquarius)' },
        { id: 12, name: 'Meena (Pisces)' }
      ]);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmissionData(data);
      setSuccessDialog(true);
      enqueueSnackbar('Schedule request submitted successfully!', { variant: 'success' });
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error submitting schedule', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialog(false);
    setSubmissionData(null);
  };

  return (
    <>
      <Card 
        sx={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.1) 100%)', 
          border: '2px solid rgba(137,108,108,0.2)',
          borderRadius: 3,
          boxShadow: '0 12px 40px rgba(137,108,108,0.15)',
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              gutterBottom
              sx={{ 
                color: '#896C6C', 
                fontWeight: 700,
                mb: 1
              }}
            >
              Schedule Your Consultation
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fill out the form below and our astrology expert will contact you within 24 hours
            </Typography>
          </Box>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Personal Information Section */}
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#896C6C', 
                    fontWeight: 600, 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Person /> Personal Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="full_name"
                  control={control}
                  rules={{ required: 'Full name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name *"
                      fullWidth
                      error={!!errors.full_name}
                      helperText={errors.full_name?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email Address *"
                      type="email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: 'Phone number is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number *"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Birth Information Section */}
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#896C6C', 
                    fontWeight: 600, 
                    mb: 2, 
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <CalendarToday /> Birth Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: 'Date of birth is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Date of Birth *"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.dob}
                      helperText={errors.dob?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Controller
                  name="birth_time"
                  control={control}
                  rules={{ required: 'Birth time is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Birth Time *"
                      type="time"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.birth_time}
                      helperText={errors.birth_time?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Controller
                  name="birth_place"
                  control={control}
                  rules={{ required: 'Birth place is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Birth Place *"
                      fullWidth
                      error={!!errors.birth_place}
                      helperText={errors.birth_place?.message}
                      placeholder="City, State, Country"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="rashi"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Rashi (Optional)"
                      fullWidth
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    >
                      <MenuItem value="">Select Rashi</MenuItem>
                      {rashis.map((rashi) => (
                        <MenuItem key={rashi.id} value={rashi.name}>
                          {rashi.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Consultation Details Section */}
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#896C6C', 
                    fontWeight: 600, 
                    mb: 2, 
                    mt: 2
                  }}
                >
                  Consultation Details
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="service"
                  control={control}
                  rules={{ required: 'Service is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Service *"
                      fullWidth
                      error={!!errors.service}
                      helperText={errors.service?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    >
                      <MenuItem value="">Select Service</MenuItem>
                      {services.map((service) => (
                        <MenuItem key={service} value={service}>
                          {service}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="timezone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Timezone"
                      fullWidth
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    >
                      {timezones.map((tz) => (
                        <MenuItem key={tz} value={tz}>
                          {tz}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="preferred_date"
                  control={control}
                  rules={{ required: 'Preferred date is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Preferred Date *"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: new Date().toISOString().split('T')[0] }}
                      error={!!errors.preferred_date}
                      helperText={errors.preferred_date?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="preferred_time"
                  control={control}
                  rules={{ required: 'Preferred time is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Preferred Time *"
                      type="time"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.preferred_time}
                      helperText={errors.preferred_time?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Additional Message (Optional)"
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Tell us more about your specific questions or concerns..."
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      py: { xs: 1.5, md: 2 }, 
                      px: { xs: 4, md: 6 },
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
                      minWidth: { xs: '100%', sm: 'auto' },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(137,108,108,0.3)'
                      },
                      '&:disabled': {
                        background: 'rgba(137,108,108,0.3)'
                      }
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} color="inherit" />
                        Submitting Request...
                      </Box>
                    ) : (
                      'Submit Schedule Request'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog 
        open={successDialog} 
        onClose={handleCloseSuccessDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.1) 100%)',
            border: '2px solid rgba(137,108,108,0.2)'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CheckCircle sx={{ fontSize: 60, color: '#4CAF50' }} />
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 700, color: '#896C6C' }}>
              Request Submitted Successfully!
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center', px: 3 }}>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            Thank you for scheduling your consultation with us. We have received your request and 
            will contact you within 24 hours to confirm your appointment.
          </Typography>
          
          {submissionData && (
            <Box 
              sx={{ 
                background: 'rgba(137,108,108,0.05)', 
                borderRadius: 2, 
                p: 3, 
                border: '1px solid rgba(137,108,108,0.1)' 
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#896C6C' }}>
                Your Consultation Details:
              </Typography>
              <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Service:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {submissionData.service}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Preferred Date:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {new Date(submissionData.preferred_date).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Preferred Time:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {submissionData.preferred_time}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            A confirmation email has been sent to your registered email address with all the details.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', p: 3 }}>
          <Button
            onClick={handleCloseSuccessDialog}
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScheduleForm;