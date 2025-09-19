import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: "#EEE6CA", 
      color: 'black', 
      py: 4, 
      mt: 'auto' 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Astrology Portal
            </Typography>
            <Typography variant="body2">
              Unlock the mysteries of your destiny through ancient Vedic astrology wisdom.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>Home</Link>
            <Link href="/services" color="inherit" display="block" sx={{ mb: 1 }}>Services</Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>About</Link>
            <Link href="/contact" color="inherit" display="block">Contact</Link>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">info@astrologyportal.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">+91 1234567890</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">Mumbai, India</Typography>
            </Box>
            <Box>
              <IconButton color="inherit"><Facebook /></IconButton>
              <IconButton color="inherit"><Twitter /></IconButton>
              <IconButton color="inherit"><Instagram /></IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 3, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            © 2025 Astrology Portal. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;