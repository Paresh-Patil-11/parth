import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import ScheduleForm from '../components/Forms/ScheduleForm';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { serviceId } = useParams();
  const location = useLocation();
  const [selectedService, setSelectedService] = useState('');

  const serviceMap = {
    'health': 'Health Consultation',
    'career': 'Career Guidance', 
    'marriage': 'Marriage & Relationships',
    'children': 'Children & Parenting',
    'finance': 'Financial Prosperity',
    'compatibility': 'Compatibility Analysis',
    'spiritual': 'Spiritual Guidance',
    'vastu': 'Vastu Consultation'
  };

  useEffect(() => {
    // Handle service from URL parameter
    if (serviceId && serviceMap[serviceId]) {
      setSelectedService(serviceMap[serviceId]);
    }
    // Handle service from navigation state
    else if (location.state?.selectedService) {
      setSelectedService(location.state.selectedService);
    }

    // Scroll to form if requested
    if (location.state?.scrollToForm) {
      setTimeout(() => {
        const formElement = document.getElementById('consultation-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [serviceId, location.state]);

  const getServiceDescription = (service) => {
    const descriptions = {
      'Health Consultation': 'Get comprehensive insights into your health patterns, planetary influences on your well-being, and receive personalized guidance for a healthier lifestyle.',
      'Career Guidance': 'Discover your professional path, optimal timing for career decisions, and strategies for workplace success based on astrological insights.',
      'Marriage & Relationships': 'Understand relationship dynamics, compatibility factors, and receive guidance for building harmonious partnerships.',
      'Children & Parenting': 'Learn about your child\'s astrological makeup, educational path guidance, and supportive parenting techniques.',
      'Financial Prosperity': 'Explore financial patterns in your chart, investment timing, and strategies for attracting abundance and prosperity.',
      'Compatibility Analysis': 'Detailed assessment for personal or business relationships and partnership success through astrological compatibility.',
      'Spiritual Guidance': 'Explore your spiritual path, karmic patterns, life purpose, and soul journey through Vedic astrological insights.',
      'Vastu Consultation': 'Balance planetary influences through strategic space alignment, energy optimization, and directional corrections for homes and offices.'
    };
    return descriptions[service] || 'Schedule a personalized consultation with our expert astrologer and discover what the stars have in store for you.';
  };

  const getServiceIcon = (service) => {
    const icons = {
      'Health Consultation': '🌿',
      'Career Guidance': '💼',
      'Marriage & Relationships': '💕',
      'Children & Parenting': '👶',
      'Financial Prosperity': '💰',
      'Compatibility Analysis': '🤝',
      'Spiritual Guidance': '🙏',
      'Vastu Consultation': '🏠'
    };
    return icons[service] || '⭐';
  };

  const getServicePrice = (service) => {
    const prices = {
      'Health Consultation': '₹3,500',
      'Career Guidance': '₹4,000',
      'Marriage & Relationships': '₹4,500',
      'Children & Parenting': '₹3,000',
      'Financial Prosperity': '₹3,500',
      'Compatibility Analysis': '₹4,500',
      'Spiritual Guidance': '₹4,000',
      'Vastu Consultation': '₹5,000'
    };
    return prices[service] || '₹3,500';
  };

  const getServiceDuration = (service) => {
    const durations = {
      'Health Consultation': '60-90 minutes',
      'Career Guidance': '75-90 minutes',
      'Marriage & Relationships': '90-120 minutes',
      'Children & Parenting': '60-75 minutes',
      'Financial Prosperity': '60-90 minutes',
      'Compatibility Analysis': '90-120 minutes',
      'Spiritual Guidance': '90-120 minutes',
      'Vastu Consultation': '120-150 minutes'
    };
    return durations[service] || '60-90 minutes';
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(245,250,225,0.3) 0%, rgba(229,190,181,0.1) 100%)' }}>
      {/* Header Section */}
      <Box
        sx={{
          background: selectedService 
            ? 'linear-gradient(135deg, rgba(137,108,108,0.9) 0%, rgba(229,190,181,0.8) 100%)' 
            : 'linear-gradient(135deg, rgba(137,108,108,0.9) 0%, rgba(229,190,181,0.8) 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
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
          <Box sx={{ textAlign: 'center' }}>
            {selectedService && (
              <Typography 
                variant="h2"
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  mb: 2,
                  opacity: 0.9
                }}
              >
                {getServiceIcon(selectedService)}
              </Typography>
            )}
            
            <Typography 
              variant={isMobile ? "h3" : "h2"} 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 2,
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              {selectedService ? `Book ${selectedService}` : 'Contact Us'}
            </Typography>
            
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              sx={{ 
                maxWidth: '900px', 
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                lineHeight: 1.6,
                opacity: 0.95,
                fontSize: { xs: '1rem', md: '1.2rem' }
              }}
            >
              {getServiceDescription(selectedService)}
            </Typography>

            {selectedService && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: { xs: 3, md: 6 },
                mt: 3,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center'
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {getServicePrice(selectedService)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Consultation Fee
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {getServiceDuration(selectedService)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Session Duration
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Form Section */}
      <Container 
        maxWidth="md" 
        sx={{ 
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 3 }
        }}
      >
        {selectedService && (
          <Box 
            sx={{ 
              mb: { xs: 4, md: 6 }, 
              textAlign: 'center',
              p: { xs: 3, md: 4 },
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(229,190,181,0.1) 100%)',
              borderRadius: 4,
              border: '2px solid rgba(137,108,108,0.2)',
              boxShadow: '0 12px 40px rgba(137,108,108,0.12)'
            }}
          >
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              gutterBottom
              sx={{ 
                color: '#896C6C', 
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '1.3rem', md: '1.8rem' }
              }}
            >
              {selectedService} - Consultation Details
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                lineHeight: 1.6,
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '0.95rem', md: '1.1rem' }
              }}
            >
              You've selected our <strong>{selectedService.toLowerCase()}</strong> service. Please fill out the form below 
              with your details and we'll schedule your personalized consultation at your convenience.
            </Typography>
          </Box>
        )}
        
        <Box sx={{ mt: 4 }} id="consultation-form">
          <ScheduleForm prefillService={selectedService} />
        </Box>

        {/* What to Expect Section */}
        <Box 
          sx={{ 
            mt: { xs: 6, md: 8 },
            p: { xs: 3, md: 4 },
            background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.1) 100%)',
            borderRadius: 4,
            border: '1px solid rgba(137,108,108,0.1)'
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 700,
              mb: { xs: 3, md: 4 },
              textAlign: 'center',
              fontSize: { xs: '1.3rem', md: '1.8rem' }
            }}
          >
            What to Expect from Your Consultation
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: { xs: 3, md: 4 }
          }}>
            <Box sx={{ 
              p: { xs: 2.5, md: 3 },
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 3,
              border: '1px solid rgba(137,108,108,0.1)',
              textAlign: 'center'
            }}>
              <Typography variant="h3" sx={{ mb: 2, fontSize: '2.5rem' }}>📋</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                Detailed Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Comprehensive birth chart analysis with personalized insights based on your unique planetary positions.
              </Typography>
            </Box>
            
            <Box sx={{ 
              p: { xs: 2.5, md: 3 },
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 3,
              border: '1px solid rgba(137,108,108,0.1)',
              textAlign: 'center'
            }}>
              <Typography variant="h3" sx={{ mb: 2, fontSize: '2.5rem' }}>🎯</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                Practical Guidance
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Actionable advice and remedies that you can implement in your daily life for positive changes.
              </Typography>
            </Box>
            
            <Box sx={{ 
              p: { xs: 2.5, md: 3 },
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 3,
              border: '1px solid rgba(137,108,108,0.1)',
              textAlign: 'center'
            }}>
              <Typography variant="h3" sx={{ mb: 2, fontSize: '2.5rem' }}>📞</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                Follow-up Support
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Ongoing support and clarifications for 30 days after your consultation session.
              </Typography>
            </Box>
            
            <Box sx={{ 
              p: { xs: 2.5, md: 3 },
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 3,
              border: '1px solid rgba(137,108,108,0.1)',
              textAlign: 'center'
            }}>
              <Typography variant="h3" sx={{ mb: 2, fontSize: '2.5rem' }}>📊</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                Written Report
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Detailed written report with all findings, predictions, and remedies for future reference.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Contact Information */}
        <Box 
          sx={{ 
            mt: { xs: 4, md: 6 },
            textAlign: 'center',
            p: { xs: 3, md: 4 },
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 4,
            border: '1px solid rgba(137,108,108,0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(137,108,108,0.1)'
          }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Need Help? Contact Us Directly
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, 
            gap: { xs: 3, md: 4 },
            textAlign: 'center'
          }}>
            <Box sx={{ 
              p: 2,
              background: 'rgba(137,108,108,0.05)',
              borderRadius: 2,
              border: '1px solid rgba(137,108,108,0.1)'
            }}>
              <Typography variant="h4" sx={{ mb: 1, fontSize: '2rem' }}>📧</Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Email
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                info@rashiguru.com
              </Typography>
            </Box>
            
            <Box sx={{ 
              p: 2,
              background: 'rgba(137,108,108,0.05)',
              borderRadius: 2,
              border: '1px solid rgba(137,108,108,0.1)'
            }}>
              <Typography variant="h4" sx={{ mb: 1, fontSize: '2rem' }}>📱</Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Phone
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                +91 1234567890
              </Typography>
            </Box>
            
            <Box sx={{ 
              p: 2,
              background: 'rgba(137,108,108,0.05)',
              borderRadius: 2,
              border: '1px solid rgba(137,108,108,0.1)'
            }}>
              <Typography variant="h4" sx={{ mb: 1, fontSize: '2rem' }}>🕒</Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Consultation Hours
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                9 AM - 8 PM (IST)
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Emergency Contact */}
        <Box 
          sx={{ 
            mt: 4,
            p: 3,
            background: 'linear-gradient(135deg, rgba(137,108,108,0.05) 0%, rgba(229,190,181,0.05) 100%)',
            borderRadius: 3,
            border: '1px solid rgba(137,108,108,0.1)',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            For urgent consultation requests or technical support, please call us directly. 
            We strive to respond to all inquiries within 24 hours.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;