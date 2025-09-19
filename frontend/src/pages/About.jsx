import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="/images/astrologer.jpg"
              alt="Astrologer"
              sx={{
                width: '100%',
                maxWidth: 300,
                height: 'auto',
                borderRadius: 2,
                mx: 'auto',
                display: 'block'
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom>
              About Our Astrologer
            </Typography>
            
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Pandit Rajesh Sharma
            </Typography>
            
            <Typography variant="body1" paragraph>
              With over 25 years of experience in Vedic astrology, Pandit Rajesh Sharma has guided 
              thousands of individuals on their life journey. Born into a family of renowned astrologers, 
              he began his spiritual education at the age of 8 under the tutelage of his grandfather, 
              a respected Jyotish Acharya.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Pandit Sharma holds a Master's degree in Sanskrit and Vedic Studies from Banaras Hindu 
              University and has received advanced training in various branches of astrology including 
              Parashari, Jaimini, and Nadi systems. His accurate predictions and practical remedies 
              have earned him recognition both nationally and internationally.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Specializing in career guidance, relationship compatibility, and health astrology, 
              Pandit Sharma combines traditional wisdom with modern understanding to provide relevant 
              and actionable insights. He believes in empowering individuals to make informed decisions 
              while respecting the cosmic influences that shape our lives.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Beyond personal consultations, Pandit Sharma conducts workshops, writes for leading 
              astrology publications, and has appeared on various television programs. His mission 
              is to make the profound wisdom of Vedic astrology accessible to everyone seeking 
              guidance and self-understanding.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 3 }}>
              Qualifications:
            </Typography>
            <Typography variant="body2" component="ul">
              <li>M.A. in Sanskrit and Vedic Studies</li>
              <li>Jyotish Visharad from Indian Council of Astrological Sciences</li>
              <li>Certified Vastu Consultant</li>
              <li>Member of All India Federation of Astrologers' Societies</li>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;