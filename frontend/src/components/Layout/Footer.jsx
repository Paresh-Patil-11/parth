import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn, WhatsApp } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: "#EEE6CA", 
      color: 'black', 
      py: 6, 
      mt: 'auto',
      background: 'linear-gradient(135deg, #EEE6CA 0%, rgba(229,190,181,0.3) 100%)'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#896C6C' }}>
              Nisha Gupta
            </Typography>
            <Typography variant="h6" sx={{ color: '#6B5555', mb: 2, fontStyle: 'italic' }}>
              Astrologer & Vastu Consultant
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, mb: 2 }}>
              Guiding people toward a more fulfilling life through practical astrological solutions 
              and lifestyle adjustments that strengthen positive planetary influences.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#896C6C' }}>
              "Understanding your Karma and life's purpose"
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#896C6C' }}>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: '#896C6C' } }}>
              Home
            </Link>
            <Link href="/services" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: '#896C6C' } }}>
              Services
            </Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: '#896C6C' } }}>
              About Nisha
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: '#896C6C' } }}>
              Book Consultation
            </Link>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#896C6C' }}>
              Services
            </Typography>
            <Typography variant="body2" display="block" sx={{ mb: 0.5 }}>Health Consultation</Typography>
            <Typography variant="body2" display="block" sx={{ mb: 0.5 }}>Career Guidance</Typography>
            <Typography variant="body2" display="block" sx={{ mb: 0.5 }}>Marriage Analysis</Typography>
            <Typography variant="body2" display="block" sx={{ mb: 0.5 }}>Vastu Consultation</Typography>
            <Typography variant="body2" display="block" sx={{ mb: 0.5 }}>Financial Guidance</Typography>
            <Typography variant="body2" display="block" sx={{ mb: 0.5 }}>Spiritual Counseling</Typography>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#896C6C' }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Email sx={{ mr: 1, fontSize: 18, color: '#896C6C' }} />
              <Typography variant="body2">nisha@rashiguru.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Phone sx={{ mr: 1, fontSize: 18, color: '#896C6C' }} />
              <Typography variant="body2">+91 98765 43210</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <WhatsApp sx={{ mr: 1, fontSize: 18, color: '#896C6C' }} />
              <Typography variant="body2">+91 98765 43210</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, fontSize: 18, color: '#896C6C' }} />
              <Typography variant="body2">Mumbai, India</Typography>
            </Box>
            
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#896C6C' }}>
              Consultation Hours:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Mon - Sat: 10:00 AM - 7:00 PM
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Sunday: By Appointment
            </Typography>

            <Box>
              <IconButton 
                color="inherit" 
                sx={{ 
                  color: '#896C6C', 
                  '&:hover': { 
                    color: '#6B5555', 
                    backgroundColor: 'rgba(137,108,108,0.1)' 
                  } 
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{ 
                  color: '#896C6C', 
                  '&:hover': { 
                    color: '#6B5555', 
                    backgroundColor: 'rgba(137,108,108,0.1)' 
                  } 
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{ 
                  color: '#896C6C', 
                  '&:hover': { 
                    color: '#6B5555', 
                    backgroundColor: 'rgba(137,108,108,0.1)' 
                  } 
                }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: '1px solid #C4C4C4' }}>
          <Typography variant="body2" sx={{ color: '#896C6C' }}>
            © {new Date().getFullYear()} Nisha Gupta. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;