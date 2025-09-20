import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import ScheduleForm from '../components/Forms/ScheduleForm';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { serviceId } = useParams();
  const [selectedService, setSelectedService] = useState('');

  const serviceMap = {
    'health': 'Health Consultation',
    'career': 'Career Guidance', 
    'marriage': 'Marriage Compatibility',
    'finance': 'Financial Planning',
    'compatibility': 'Compatibility Analysis',
    'spiritual': 'Spiritual Guidance'
  };

  useEffect(() => {
    if (serviceId && serviceMap[serviceId]) {
      setSelectedService(serviceMap[serviceId]);
    }
  }, [serviceId]);

  const getServiceDescription = (service) => {
    const descriptions = {
      'Health Consultation': 'Get comprehensive insights into your health patterns and receive personalized guidance for your wellbeing.',
      'Career Guidance': 'Discover your professional path and optimal timing for career decisions and business ventures.',
      'Marriage Compatibility': 'Understand relationship dynamics and receive guidance for a harmonious partnership.',
      'Financial Planning': 'Learn about investment opportunities and financial planning based on astrological insights.',
      'Compatibility Analysis': 'Detailed assessment for personal or business relationships and partnership success.',
      'Spiritual Guidance': 'Explore your spiritual path, karmic patterns, and soul purpose with expert guidance.'
    };
    return descriptions[service] || 'Schedule a consultation with our expert astrologer and discover what the stars have in store for you.';
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(245,250,225,0.3) 0%, rgba(229,190,181,0.1) 100%)' }}>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(137,108,108,0.9) 0%, rgba(229,190,181,0.8) 100%)',
          color: 'white',
          py: { xs: 4, md: 6 },
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
            <Typography 
              variant={isMobile ? "h3" : "h2"} 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 2
              }}
            >
              {selectedService ? `Book ${selectedService}` : 'Contact Us'}
            </Typography>
            
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                lineHeight: 1.6,
                opacity: 0.95
              }}
            >
              {getServiceDescription(selectedService)}
            </Typography>
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
              mb: 4, 
              textAlign: 'center',
              p: { xs: 3, md: 4 },
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(229,190,181,0.1) 100%)',
              borderRadius: 3,
              border: '2px solid rgba(137,108,108,0.2)',
              boxShadow: '0 8px 32px rgba(137,108,108,0.12)'
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
              {selectedService} - Consultation Details
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                lineHeight: 1.6,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              You've selected our {selectedService.toLowerCase()} service. Please fill out the form below 
              with your details and we'll schedule your personalized consultation at your convenience.
            </Typography>
          </Box>
        )}
        
        <Box sx={{ mt: 4 }}>
          <ScheduleForm prefillService={selectedService} />
        </Box>

        {/* Additional Information */}
        <Box 
          sx={{ 
            mt: { xs: 6, md: 8 },
            p: { xs: 3, md: 4 },
            background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.1) 100%)',
            borderRadius: 3,
            border: '1px solid rgba(137,108,108,0.1)'
          }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 600,
              mb: 3,
              textAlign: 'center'
            }}
          >
            What to Expect
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 3 
          }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                📋 Detailed Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive birth chart analysis with personalized insights based on your unique planetary positions.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                🎯 Practical Guidance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Actionable advice and remedies that you can implement in your daily life for positive changes.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                📞 Follow-up Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ongoing support and clarifications for 30 days after your consultation session.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
                📊 Written Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
            background: 'rgba(255,255,255,0.8)',
            borderRadius: 3,
            border: '1px solid rgba(137,108,108,0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 600,
              mb: 2
            }}
          >
            Need Help? Contact Us Directly
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, 
            gap: 2,
            textAlign: 'center'
          }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                📧 Email
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                info@rashiguru.com
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                📱 Phone
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                +91 1234567890
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                🕒 Consultation Hours
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                9 AM - 8 PM (IST)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;