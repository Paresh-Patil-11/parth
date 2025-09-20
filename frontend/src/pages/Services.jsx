import React from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, CardMedia,
  Button, useTheme, useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  HealthAndSafety, Work, Favorite, AttachMoney, 
  People, SelfImprovement 
} from '@mui/icons-material';

const Services = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const services = [
    {
      id: 'health',
      name: 'Health Consultation',
      image: '/images/health.jpg',
      icon: <HealthAndSafety sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Get comprehensive insights into your health patterns and potential concerns based on planetary positions. Receive personalized guidance on preventive measures, favorable periods for medical procedures, and natural remedies aligned with your astrological chart.',
      features: ['Health risk analysis', 'Preventive measures', 'Best treatment timing', 'Natural remedies'],
      price: '₹2,500'
    },
    {
      id: 'career',
      name: 'Career Guidance',
      image: '/images/career.jpg',
      icon: <Work sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Discover your professional strengths, ideal career paths, and optimal timing for job changes or business ventures. Understand periods of growth, challenges, and opportunities in your professional journey.',
      features: ['Career path analysis', 'Job change timing', 'Business opportunities', 'Professional growth'],
      price: '₹3,000'
    },
    {
      id: 'marriage',
      name: 'Marriage Compatibility',
      image: '/images/marriage.jpg',
      icon: <Favorite sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Comprehensive compatibility analysis for couples considering marriage or seeking to improve their relationship. Understand relationship dynamics, potential challenges, and effective remedies for a harmonious union.',
      features: ['Compatibility scoring', 'Relationship analysis', 'Marriage timing', 'Harmony remedies'],
      price: '₹3,500'
    },
    {
      id: 'finance',
      name: 'Financial Planning',
      image: '/images/finance.jpg',
      icon: <AttachMoney sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Learn about your financial prospects, investment opportunities, and periods of monetary gain or loss. Get expert guidance on wealth accumulation, financial security, and profitable investment timing.',
      features: ['Investment timing', 'Wealth analysis', 'Financial risks', 'Profit periods'],
      price: '₹2,800'
    },
    {
      id: 'compatibility',
      name: 'Compatibility Analysis',
      image: '/images/compatibility.jpg',
      icon: <People sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Detailed compatibility assessment for personal or business relationships. Understand strengths, challenges, and practical ways to improve harmony and success in all types of partnerships.',
      features: ['Personal compatibility', 'Business partnerships', 'Friendship analysis', 'Conflict resolution'],
      price: '₹2,200'
    },
    {
      id: 'spiritual',
      name: 'Spiritual Guidance',
      image: '/images/spiritual.jpg',
      icon: <SelfImprovement sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Explore your spiritual path, karmic patterns, and soul purpose. Receive guidance on spiritual practices, meditation techniques, and favorable periods for spiritual growth and enlightenment.',
      features: ['Spiritual path guidance', 'Karmic analysis', 'Meditation practices', 'Soul purpose'],
      price: '₹2,000'
    }
  ];

  const handleServiceClick = (serviceId) => {
    navigate(`/contact/${serviceId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Banner Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(137,108,108,0.9) 0%, rgba(229,190,181,0.8) 100%), url("/images/astrology-banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: 6, md: 10 },
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(137,108,108,0.8) 0%, rgba(229,190,181,0.6) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant={isMobile ? "h3" : "h2"} 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2
            }}
          >
            Our Astrology Services
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            align="center" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              lineHeight: 1.6
            }}
          >
            Unlock the wisdom of the stars with our comprehensive astrology consultations. 
            Each service is personalized based on your unique birth chart and current planetary transits.
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 700,
              mb: 2
            }}
          >
            Choose Your Consultation
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Click on any service below to schedule your personalized astrology consultation
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} lg={4} key={service.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.05) 100%)',
                  border: '2px solid rgba(137,108,108,0.1)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(137,108,108,0.25)',
                    borderColor: '#896C6C',
                    '& .service-image': {
                      transform: 'scale(1.1)'
                    },
                    '& .service-button': {
                      background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
                      transform: 'translateY(-2px)'
                    }
                  }
                }}
                onClick={() => handleServiceClick(service.id)}
              >
                {/* Service Image */}
                <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.name}
                    className="service-image"
                    sx={{
                      transition: 'transform 0.3s ease',
                      objectFit: 'cover'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      p: 1.5,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      color: 'white',
                      p: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {service.name}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        color: '#FFD700',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {service.price}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ 
                      flexGrow: 1, 
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      mb: 2
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* Features List */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                      What's Included:
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {service.features.map((feature, index) => (
                        <Typography 
                          key={index}
                          component="li" 
                          variant="body2" 
                          sx={{ 
                            mb: 0.5,
                            color: 'text.secondary',
                            fontSize: '0.85rem'
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    className="service-button"
                    sx={{ 
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
                      }
                    }}
                  >
                    Book {service.name}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action Section */}
        <Box 
          sx={{ 
            mt: { xs: 6, md: 10 }, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.1) 100%)',
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            border: '2px solid rgba(137,108,108,0.1)'
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 700,
              mb: 2
            }}
          >
            Not Sure Which Service to Choose?
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Our expert astrologer can help you determine the best consultation type based on your 
            specific needs and current life situation. Schedule a general consultation to get started.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              borderWidth: 2,
              borderColor: '#896C6C',
              color: '#896C6C',
              '&:hover': {
                borderWidth: 2,
                borderColor: '#6B5555',
                backgroundColor: 'rgba(137, 108, 108, 0.08)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(137,108,108,0.2)'
              }
            }}
          >
            Get General Consultation
          </Button>
        </Box>
      </Container>

      {/* Additional Info Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
          color: 'white',
          py: { xs: 4, md: 6 }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Why Choose Our Services?
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, opacity: 0.95 }}>
                With over 25 years of experience in Vedic astrology, we provide accurate, 
                personalized consultations that combine ancient wisdom with modern understanding. 
                Our consultations include detailed analysis, practical remedies, and ongoing support.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      10,000+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Happy Clients
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      25+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Years Experience
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      98%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Accuracy Rate
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      24/7
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Support
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Services;