import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import RashiBox from "./RashiBox";
import Blog from './Blog'

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [rashis, setRashis] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rashisRes, reviewsRes] = await Promise.all([
        api.get("/rashis"),
        api.get("/reviews"),
      ]);
      setRashis(rashisRes.data.data);
      setReviews(reviewsRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box>
      {/* Hero Section with Video Background */}
      <Box
        sx={{
          position: "relative",
          minHeight: "90vh",
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          color: "white",
          textAlign: "start",
          p: { xs: 2, md: 4 },
          overflow: "hidden",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/public/images/backgrounds/header.mp4"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -2,
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
            zIndex: -1,
          }}
        />

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography 
            variant={isMobile ? "h3" : "h2"} 
            gutterBottom
            sx={{
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              mb: 2
            }}
          >
            Transform Your Life with Nisha Gupta
          </Typography>
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ 
              mb: 2,
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              maxWidth: '800px'
            }}
          >
            Astrologer & Vastu Consultant
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            sx={{ 
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              fontStyle: 'italic',
              opacity: 0.95,
              maxWidth: '900px'
            }}
          >
            "Guiding you toward a more fulfilling life through practical astrological solutions and lifestyle adjustments that strengthen positive planetary influences"
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ 
              backgroundColor: "white", 
              color: theme.palette.primary.main,
              py: { xs: 1.5, md: 2 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(255,255,255,0.3)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.95)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(255,255,255,0.4)'
              }
            }}
            onClick={() => navigate("/contact")}
          >
            Schedule Your Consultation
          </Button>
        </Container>
      </Box>

      {/* About Nisha Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: 'auto', md: "100vh" },
          display: "flex",
          alignItems: "center",
          py: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, rgba(245,250,225,0.3) 0%, rgba(229,190,181,0.1) 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
            {/* Left Side - Text Content */}
            <Grid item xs={12} md={7}>
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                gutterBottom
                sx={{ 
                  color: '#896C6C', 
                  fontWeight: 700,
                  mb: 3
                }}
              >
                Why Choose Nisha Gupta?
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "700px",
                  textAlign: "justify",
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.7,
                  mb: 3,
                  color: '#2C2C2C'
                }}
              >
                With extensive experience in Vedic astrology and Vastu consultation, Nisha Gupta offers 
                a unique approach that goes beyond traditional predictions. Her methodology focuses on 
                practical lifestyle adjustments and consistent habits that strengthen positive planetary 
                influences, helping you move steadily toward your goals.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: "700px",
                  textAlign: "justify",
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.7,
                  mb: 3,
                  color: '#2C2C2C'
                }}
              >
                She understands your shortcomings even before you do, and guides you to improve them 
                step by step through practical lifestyle adjustments and Vastu-based suggestions. By 
                blending the ancient wisdom of Astrology and Vastu with today's modern needs, she offers 
                guidance that feels both timeless and relevant.
              </Typography>

              <Box 
                sx={{ 
                  p: 3, 
                  background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.15) 100%)',
                  borderRadius: 2,
                  border: '2px solid rgba(137,108,108,0.2)',
                  mt: 4
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontStyle: 'italic',
                    color: '#896C6C',
                    fontWeight: 600,
                    textAlign: 'center',
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  "Vastu plays a key role in balancing planetary influences that may not be fully supportive in your birth chart."
                </Typography>
              </Box>
            </Grid>

            {/* Right Side - Image */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  component="img"
                  src="/public/images/nisha-gupta-main.jpg"
                  alt="Nisha Gupta - Astrologer & Vastu Consultant"
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 3,
                    boxShadow: '0 12px 40px rgba(137,108,108,0.25)',
                    border: '3px solid #896C6C'
                  }}
                />
                
                {/* Floating Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    background: 'linear-gradient(135deg, #896C6C 0%, #E5BEB5 100%)',
                    color: 'white',
                    p: 2,
                    borderRadius: '50%',
                    boxShadow: '0 8px 24px rgba(137,108,108,0.3)',
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, textAlign: 'center', fontSize: '0.75rem' }}>
                    Vastu<br/>Expert
                  </Typography>
                </Box>
                
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -15,
                    left: -15,
                    background: 'linear-gradient(135deg, #E5BEB5 0%, #F5FAE1 100%)',
                    color: '#896C6C',
                    p: 2,
                    borderRadius: 2,
                    boxShadow: '0 8px 24px rgba(137,108,108,0.2)',
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    25+ Years<br/>Experience
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Preview */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: 'rgba(255,255,255,0.8)' }}>
        <Container maxWidth="lg">
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            align="center" 
            gutterBottom
            sx={{ 
              color: '#896C6C', 
              fontWeight: 700,
              mb: 4
            }}
          >
            Specialized Consultation Services
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                title: "Health Consultation",
                description: "Explore planetary influences on your well-being and discover the lifestyle changes essential for a healthier tomorrow.",
                icon: "🌿"
              },
              {
                title: "Career Guidance", 
                description: "Identify subtle shifts in attitude and perspective that reveal whether your current career direction supports your growth.",
                icon: "💼"
              },
              {
                title: "Marriage & Relationships",
                description: "Uncover patterns, hidden challenges, and personal blind spots to guide you toward stronger connections.",
                icon: "💕"
              },
              {
                title: "Parenting & Children",
                description: "Map a path for your children's brighter future with supportive parenting techniques and lifestyle adjustments.",
                icon: "👶"
              },
              {
                title: "Financial Prosperity",
                description: "Examine your horoscope for habits and energies blocking financial flow and discover realistic changes for abundance.",
                icon: "💰"
              },
              {
                title: "Vastu Consultation",
                description: "Balance planetary influences through strategic space alignment and energy optimization for homes and offices.",
                icon: "🏠"
              }
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.05) 100%)',
                    border: '2px solid rgba(137,108,108,0.1)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 48px rgba(137,108,108,0.2)',
                      borderColor: '#896C6C'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Typography 
                      variant="h3" 
                      sx={{ mb: 2, fontSize: '3rem' }}
                    >
                      {service.icon}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ 
                        color: '#896C6C', 
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        lineHeight: 1.6,
                        color: '#5A5A5A'
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/services")}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(137,108,108,0.3)'
                }
              }}
            >
              Explore All Services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Daily Horoscope Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: 'linear-gradient(135deg, rgba(229,190,181,0.1) 0%, rgba(245,250,225,0.3) 100%)' }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h4" : "h3"}
            align="center"
            gutterBottom
            sx={{
              color: '#896C6C',
              fontWeight: 700,
              mb: 4
            }}
          >
            Daily Horoscope
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 4, color: '#5A5A5A', maxWidth: 800, mx: 'auto', fontSize: { xs: '1rem', md: '1.15rem' } }}
          >
            Get your daily horoscope prediction to navigate your day with a positive mindset and be prepared for what the stars have in store.
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {rashis.map((rashi) => (
              <Grid item xs={6} sm={4} md={2} key={rashi.id}>
                <RashiBox rashi={rashi} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#F5FAE1' }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h4" : "h3"}
            align="center"
            gutterBottom
            sx={{
              color: '#896C6C',
              fontWeight: 700,
              mb: 4
            }}
          >
            What Our Clients Say
          </Typography>
          <Grid container spacing={4}>
            {reviews.slice(0, 3).map((review, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 48px rgba(137,108,108,0.2)'
                    }
                  }}
                >
                  <Box>
                    <Rating name="read-only" value={review.rating} readOnly sx={{ color: '#896C6C', mb: 1 }} />
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, color: '#5A5A5A' }}>
                      "{review.comment}"
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6B5555' }}>
                    - {review.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/testimonials")}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#896C6C',
                borderColor: '#896C6C',
                '&:hover': {
                  backgroundColor: 'rgba(137,108,108,0.05)',
                  borderColor: '#6B5555',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Read All Testimonials
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Blog Section */}
      <Blog />
    </Box>
  );
};

export default Home;