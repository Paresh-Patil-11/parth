import React from 'react';
import { Box, Container, Typography, Paper, Grid, useTheme, useMediaQuery } from '@mui/material';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(245,250,225,0.3) 0%, rgba(229,190,181,0.1) 100%)' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(137,108,108,0.9) 0%, rgba(229,190,181,0.8) 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
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
            Meet Nisha Gupta
          </Typography>
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            align="center" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              lineHeight: 1.6,
              opacity: 0.95,
              fontStyle: 'italic'
            }}
          >
            "Astrology and Vastu Consultant - Guiding You Toward a More Fulfilling Life"
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 6 },
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.05) 100%)',
            border: '2px solid rgba(137,108,108,0.1)',
            borderRadius: 3
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="/images/nisha-gupta.jpg"
                alt="Nisha Gupta - Astrologer & Vastu Consultant"
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  height: 'auto',
                  borderRadius: 3,
                  mx: 'auto',
                  display: 'block',
                  boxShadow: '0 8px 32px rgba(137,108,108,0.2)',
                  border: '3px solid #896C6C'
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                gutterBottom
                sx={{ 
                  color: '#896C6C', 
                  fontWeight: 700,
                  mb: 2
                }}
              >
                Nisha Gupta
              </Typography>
              
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                gutterBottom 
                sx={{ 
                  mt: 2, 
                  color: '#6B5555',
                  fontWeight: 500
                }}
              >
                Astrologer & Vastu Consultant
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                A well-known astrologer and vastu consultant with extensive experience across diverse areas, 
                Nisha Gupta has been guiding people toward a more fulfilling life through practical and 
                actionable astrological solutions. Her approach goes beyond mere predictions—she focuses on 
                lifestyle adjustments and consistent habits that strengthen positive planetary influences and 
                help individuals move steadily toward their goals.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                She understands your shortcomings even before you do, and guides you to improve them step by 
                step through practical lifestyle adjustments and Vastu-based suggestions. Vastu plays a key role 
                in balancing planetary influences that may not be fully supportive in your birth chart.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                By blending the wisdom of Astrology and Vastu with today's modern needs, she offers guidance 
                that feels both timeless and relevant.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Philosophy Section */}
        <Paper 
          elevation={2} 
          sx={{ 
            mt: { xs: 4, md: 6 }, 
            p: { xs: 3, md: 5 },
            background: 'linear-gradient(135deg, rgba(137,108,108,0.05) 0%, rgba(229,190,181,0.1) 100%)',
            border: '1px solid rgba(137,108,108,0.1)',
            borderRadius: 3
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 700,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Philosophy & Approach
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                As human beings, we all encounter moments when we feel stuck or uncertain about the direction 
                of our lives. At such crossroads, it can be difficult to gauge whether a leap of faith will 
                lead to success or setbacks. Vedic astrology offers valuable insights during these times, 
                helping us understand the hidden patterns that shape our experiences and illuminating ways to 
                navigate challenges with clarity.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                Drawing on this ancient wisdom, Nisha Gupta works closely with clients to identify personal 
                strengths and uncover areas that need attention. She empowers them with confidence and 
                self-awareness, enabling positive change in aspects of life that cause worry or doubt. Her 
                guidance includes practical remedies—simple, everyday steps and rituals—that create a 
                transformative, 360-degree shift, leading to more harmonious outcomes and a renewed sense of purpose.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                Astrology is not something to be feared; it is a tool for understanding yourself and the 
                patterns in your life more clearly. Rather than predicting doom or controlling your choices, 
                it serves as a guiding medium—helping you recognize opportunities, navigate challenges, and 
                accept the realities that require grace and patience. By offering perspective, astrology 
                encourages self-awareness and acceptance, allowing you to work with life's natural rhythms 
                instead of resisting them.
              </Typography>
              
              <Box 
                sx={{ 
                  mt: 4, 
                  p: 3, 
                  background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.15) 100%)',
                  borderRadius: 2,
                  border: '2px solid rgba(137,108,108,0.2)',
                  textAlign: 'center'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontStyle: 'italic', 
                    color: '#896C6C', 
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  "I help you understand your Karma and pending Karma, your existence and purpose of life."
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Expertise Areas */}
        <Paper 
          elevation={2} 
          sx={{ 
            mt: { xs: 4, md: 6 }, 
            p: { xs: 3, md: 5 },
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,250,225,0.5) 100%)',
            border: '1px solid rgba(137,108,108,0.1)',
            borderRadius: 3
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 700,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Areas of Expertise
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box 
                sx={{ 
                  p: 3, 
                  background: 'rgba(137,108,108,0.08)',
                  borderRadius: 2,
                  border: '1px solid rgba(137,108,108,0.15)',
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#896C6C' }}>
                  🏠 Vastu Consultation
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  Balancing planetary influences through strategic space alignment and energy optimization for homes and offices.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box 
                sx={{ 
                  p: 3, 
                  background: 'rgba(137,108,108,0.08)',
                  borderRadius: 2,
                  border: '1px solid rgba(137,108,108,0.15)',
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#896C6C' }}>
                  🔮 Vedic Astrology
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  In-depth birth chart analysis, planetary transit interpretations, and karmic pattern identification.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box 
                sx={{ 
                  p: 3, 
                  background: 'rgba(137,108,108,0.08)',
                  borderRadius: 2,
                  border: '1px solid rgba(137,108,108,0.15)',
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#896C6C' }}>
                  🌱 Lifestyle Guidance
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  Practical daily habits and rituals that align with planetary influences for positive life transformation.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box 
                sx={{ 
                  p: 3, 
                  background: 'rgba(137,108,108,0.08)',
                  borderRadius: 2,
                  border: '1px solid rgba(137,108,108,0.15)',
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#896C6C' }}>
                  🔄 Remedial Measures
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  Simple, effective remedies and rituals to strengthen beneficial planetary influences and reduce negative impacts.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Contact CTA */}
        <Box 
          sx={{ 
            mt: { xs: 6, md: 8 }, 
            textAlign: 'center',
            p: { xs: 4, md: 6 },
            background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.15) 100%)',
            borderRadius: 3,
            border: '2px solid rgba(137,108,108,0.2)'
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 700,
              mb: 3
            }}
          >
            Ready to Transform Your Life?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            Begin your journey of self-discovery and positive transformation with personalized astrological guidance from Nisha Gupta.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;