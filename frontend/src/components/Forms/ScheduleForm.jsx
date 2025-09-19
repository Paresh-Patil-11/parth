import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Grid, MenuItem, Typography,
  Card, CardContent, CircularProgress, Alert
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import api from '../../services/api';

const ScheduleForm = ({ prefillRashi, prefillService, onSuccess }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [rashis, setRashis] = useState([]);
  
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
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/schedules', data);
      enqueueSnackbar('Schedule request submitted successfully!', { variant: 'success' });
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error submitting schedule', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ backgroundColor: 'rgba(229,190,181,0.1)', border: '2px solid rgb(238,230,202)' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Schedule a Consultation
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                name="full_name"
                control={control}
                rules={{ required: 'Full name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    error={!!errors.full_name}
                    helperText={errors.full_name?.message}
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
                    label="Email"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                    label="Phone Number"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="dob"
                control={control}
                rules={{ required: 'Date of birth is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="birth_time"
                control={control}
                rules={{ required: 'Birth time is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Birth Time"
                    type="time"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.birth_time}
                    helperText={errors.birth_time?.message}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="birth_place"
                control={control}
                rules={{ required: 'Birth place is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Birth Place"
                    fullWidth
                    error={!!errors.birth_place}
                    helperText={errors.birth_place?.message}
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
            
            <Grid item xs={12} md={6}>
              <Controller
                name="service"
                control={control}
                rules={{ required: 'Service is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Service"
                    fullWidth
                    error={!!errors.service}
                    helperText={errors.service?.message}
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
                name="preferred_date"
                control={control}
                rules={{ required: 'Preferred date is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Preferred Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: new Date().toISOString().split('T')[0] }}
                    error={!!errors.preferred_date}
                    helperText={errors.preferred_date?.message}
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
                    label="Preferred Time"
                    type="time"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.preferred_time}
                    helperText={errors.preferred_time?.message}
                  />
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
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Submit Schedule Request'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScheduleForm;