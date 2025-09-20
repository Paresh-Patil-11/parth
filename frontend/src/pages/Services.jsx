import React from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, CardMedia,
  Button, useTheme, useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  HealthAndSafety, Work, Favorite, AttachMoney, 
  People, SelfImprovement, Home as HomeIcon
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
      description: 'Which planetary influences may be affecting your well-being? We\'ll explore the lifestyle changes your doctor has already suggested—the ones you\'ve postponed—but that are now essential for a healthier tomorrow. Discover how planetary positions impact your physical and mental health, and receive practical guidance on diet, exercise, and daily routines that align with your astrological profile.',
      features: ['Planetary health analysis', 'Lifestyle adjustment recommendations', 'Preventive health measures', 'Mind-body balance guidance'],
      price: '₹3,500',
      duration: '60-90 minutes'
    },
    {
      id: 'career',
      name: 'Career Guidance',
      image: '/images/career.jpg',
      icon: <Work sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Your approach to people and your outlook on work shape your professional path. Together we\'ll identify subtle shifts in attitude and perspective that reveal whether your current career direction truly supports your growth. Uncover your professional strengths, ideal timing for career moves, and strategies for workplace success.',
      features: ['Career path analysis', 'Professional timing guidance', 'Leadership potential assessment', 'Work-life balance strategies'],
      price: '₹4,000',
      duration: '75-90 minutes'
    },
    {
      id: 'marriage',
      name: 'Marriage & Relationships',
      image: '/images/marriage.jpg',
      icon: <Favorite sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Whether you\'re seeking a partner or nurturing an existing relationship, we\'ll look at your chart to uncover patterns, hidden challenges, and personal blind spots. This astrological lens can guide you toward stronger connections and deeper understanding, helping you build lasting and harmonious relationships.',
      features: ['Compatibility analysis', 'Relationship pattern identification', 'Communication improvement guidance', 'Marriage timing consultation'],
      price: '₹4,500',
      duration: '90-120 minutes'
    },
    {
      id: 'children',
      name: 'Children & Parenting',
      image: '/images/children.jpg',
      icon: <People sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'If you\'re a parent—or planning to be—we can map a path for your children\'s brighter future. Expect practical guidance on supportive parenting techniques and lifestyle adjustments to help them flourish. Understanding your child\'s astrological makeup helps you nurture their unique talents and navigate challenges.',
      features: ['Child\'s birth chart analysis', 'Educational path guidance', 'Talent identification', 'Parent-child compatibility'],
      price: '₹3,000',
      duration: '60-75 minutes'
    },
    {
      id: 'finance',
      name: 'Financial Prosperity',
      image: '/images/finance.jpg',
      icon: <AttachMoney sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Working hard but struggling to attract abundance? Let\'s examine your horoscope for habits and energies that may be blocking financial flow, and discover realistic changes to invite greater prosperity. Learn about favorable periods for investments, business ventures, and wealth accumulation.',
      features: ['Financial pattern analysis', 'Investment timing guidance', 'Abundance mindset coaching', 'Wealth building strategies'],
      price: '₹3,500',
      duration: '60-90 minutes'
    },
    {
      id: 'vastu',
      name: 'Vastu Consultation',
      image: '/images/vastu.jpg',
      icon: <HomeIcon sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Balance planetary influences that may not be fully supportive in your birth chart through strategic space alignment and energy optimization. Vastu plays a key role in harmonizing your living and working spaces to enhance positive energy flow and support your astrological strengths.',
      features: ['Home/office energy assessment', 'Space optimization guidance', 'Directional corrections', 'Planetary influence balancing'],
      price: '₹5,000',
      duration: '120-150 minutes'
    },
    {
      id: 'spiritual',
      name: 'Spiritual Guidance',
      image: '/images/spiritual.jpg',
      icon: <SelfImprovement sx={{ fontSize: 40, color: '#896C6C' }} />,
      description: 'Understanding your Karma and pending Karma, your existence and purpose of life. Explore your spiritual path through the lens of Vedic astrology, uncovering your soul\'s journey and the lessons you\'re here to learn. Receive guidance on spiritual practices that align with your astrological profile.',
      features: ['Karmic pattern analysis', 'Life purpose exploration', 'Spiritual practice recommendations', 'Soul journey guidance'],
      price: '₹4,000',
      duration: '90-120 minutes'
    }
  ];

  const handleServiceClick = (serviceId) => {
    // Navigate directly to contact page with service parameter
    navigate(`/contact/${serviceId}`);
  };

  const handleBookService = (serviceId, serviceName) => {
    // Navigate directly to contact page with service parameter and scroll to form
    navigate(`/contact/${serviceId}`, { 
      state: { 
        selectedService: serviceName,
        scrollToForm: true 
      } 
    });
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Banner Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(137,108,108,0.9) 0%, rgba(229,190,181,0.8) 100%), url("/images/nisha-services-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: 6, md: 12 },
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
              mb: 3
            }}
          >
            Nisha Gupta's Consultation Services
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            align="center" 
            sx={{ 
              maxWidth: '900px', 
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              lineHeight: 1.6,
              opacity: 0.95
            }}
          >
            Practical astrological solutions that go beyond predictions. Experience personalized guidance 
            through lifestyle adjustments, Vastu recommendations, and spiritual insights that create lasting transformation.
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
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
            Specialized Consultation Areas
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6
            }}
          >
            Each consultation is personalized based on your unique birth chart, current planetary transits, 
            and specific life circumstances. Click on any service to book your transformative session.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} lg={6} key={service.id}>
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
                    transform: 'translateY(-8px) scale(1.01)',
                    boxShadow: '0 20px 60px rgba(137,108,108,0.25)',
                    borderColor: '#896C6C',
                    '& .service-image': {
                      transform: 'scale(1.05)'
                    },
                    '& .service-button': {
                      background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
                      transform: 'translateY(-2px)'
                    }
                  }
                }}
                onClick={() => handleServiceClick(service.id)}
              >
                {/* Service Header */}
                <Box sx={{ position: 'relative', p: 3, textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.1) 100%)',
                      borderRadius: '50%',
                      border: '3px solid rgba(137,108,108,0.2)',
                      mb: 2
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#896C6C', mb: 1 }}>
                    {service.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        color: '#E5BEB5',
                        background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {service.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {service.duration}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, pt: 0 }}>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ 
                      flexGrow: 1, 
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      mb: 3
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* Features List */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#896C6C' }}>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookService(service.id, service.name);
                    }}
                    sx={{ 
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
                      }
                    }}
                  >
                    Book {service.name} Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action Section */}
        <Box 
          sx={{ 
            mt: { xs: 8, md: 12 }, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.1) 100%)',
            borderRadius: 3,
            p: { xs: 4, md: 8 },
            border: '2px solid rgba(137,108,108,0.1)'
          }}
        >
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 700,
              mb: 3
            }}
          >
            Not Sure Which Service is Right for You?
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              mb: 4,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            Every individual's astrological needs are unique. Nisha can help you determine the most beneficial 
            consultation approach based on your current life circumstances, birth chart, and personal goals. 
            Start with a comprehensive consultation to get the complete picture.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              borderWidth: 2,
              borderColor: '#896C6C',
              color: '#896C6C',
              textTransform: 'none',
              '&:hover': {
                borderWidth: 2,
                borderColor: '#6B5555',
                backgroundColor: 'rgba(137, 108, 108, 0.08)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(137,108,108,0.2)'
              }
            }}
          >
            Schedule Initial Consultation
          </Button>
        </Box>
      </Container>

      {/* Why Choose Nisha Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
          color: 'white',
          py: { xs: 6, md: 10 }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                gutterBottom
                sx={{ fontWeight: 700, mb: 3 }}
              >
                The Nisha Gupta Difference
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, opacity: 0.95, mb: 3 }}>
                Unlike traditional astrologers who focus solely on predictions, Nisha's approach emphasizes 
                practical transformation. She combines the ancient wisdom of Vedic astrology with Vastu principles 
                to create comprehensive lifestyle solutions.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, opacity: 0.95 }}>
                Her consultations include actionable remedies, daily practices, and environmental adjustments 
                that work synergistically to strengthen positive planetary influences and minimize challenges.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                      15+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Years Experience
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                      5000+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Lives Transformed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                      98%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Client Satisfaction
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                      24/7
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Follow-up Support
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