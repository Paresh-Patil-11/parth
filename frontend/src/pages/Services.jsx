import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, CardMedia,
  Button, useTheme
} from '@mui/material';
import ScheduleForm from '../components/Forms/ScheduleForm';

const Services = () => {
  const theme = useTheme();
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      name: 'Health Consultation',
      image: '/images/health.jpg',
      description: 'Get insights into your health patterns and potential concerns based on planetary positions. Receive guidance on preventive measures and favorable periods for medical procedures.'
    },
    {
      name: 'Career Guidance',
      image: '/images/career.jpg',
      description: 'Discover your professional strengths, ideal career paths, and timing for job changes or business ventures. Understand periods of growth and challenges in your career.'
    },
    {
      name: 'Marriage Compatibility',
      image: '/images/marriage.jpg',
      description: 'Comprehensive compatibility analysis for couples considering marriage. Understand relationship dynamics, potential challenges, and remedies for a harmonious union.'
    },
    {
      name: 'Financial Planning',
      image: '/images/finance.jpg',
      description: 'Learn about your financial prospects, investment opportunities, and periods of gain or loss. Get guidance on wealth accumulation and financial security.'
    },
    {
      name: 'Compatibility Analysis',
      image: '/images/compatibility.jpg',
      description: 'Detailed compatibility assessment for personal or business relationships. Understand strengths, challenges, and ways to improve harmony in relationships.'
    },
    {
      name: 'Spiritual Guidance',
      image: '/images/spiritual.jpg',
      description: 'Explore your spiritual path, karmic patterns, and soul purpose. Receive guidance on spiritual practices and favorable periods for spiritual growth.'
    }
  ];

  return (
    <Box>
      {/* Banner Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(137,108,108,0.8), rgba(137,108,108,0.8)), url("/images/astrology-banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 8,
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="h6" align="center" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Unlock the wisdom of the stars with our comprehensive astrology consultations. 
            Each service is personalized based on your unique birth chart and current planetary transits.
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} md={6} lg={4} key={service.name}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image}
                  alt={service.name}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" gutterBottom>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {service.description}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => {
                      setSelectedService(service.name);
                      setShowScheduleForm(true);
                    }}
                  >
                    Schedule {service.name}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Schedule Form */}
      {showScheduleForm && (
        <Container maxWidth="md" sx={{ pb: 6 }}>
          <ScheduleForm 
            prefillService={selectedService}
            onSuccess={() => setShowScheduleForm(false)}
          />
        </Container>
      )}
    </Box>
  );
};

export default Services;