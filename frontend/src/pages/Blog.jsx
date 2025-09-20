

import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { CalendarToday, TrendingUp, Favorite, Work, HealthAndSafety, ChevronLeft, ChevronRight, AutoAwesome } from '@mui/icons-material';

const Blog = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const horoscopeCards = [
    {
      id: 1,
      title: "Advanced Techniques Of Predictive KP Astrology",
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      category: "Today's Energy",
      icon: <AutoAwesome sx={{ fontSize: 32, color: 'white' }} />,
      description: "The planetary alignment today brings a powerful surge of transformative energy. Mars in conjunction with Jupiter creates opportunities for bold decisions and new beginnings. Trust your intuition and take calculated risks.",
      keyPoints: ["High energy levels", "Good for new projects", "Trust your instincts"],
      iconColor: "#FF7F39"
    },
    {
      id: 2,
      title: "Bhrigu Nandi Nadi Astrology",
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      category: "Love & Relations",
      icon: <AutoAwesome sx={{ fontSize: 32, color: 'white' }} />,
      description: "Venus blesses your romantic sector today, bringing harmony and understanding in relationships. Single individuals may encounter meaningful connections, while couples find renewed passion.",
      keyPoints: ["Romantic opportunities", "Deeper connections", "Emotional healing"],
      iconColor: "#FF7F39"
    },
    {
      id: 3,
      title: "Advanced Techniques Of Predictive KP & Nadi Astrology",
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      category: "Career Focus",
      icon: <AutoAwesome sx={{ fontSize: 32, color: 'white' }} />,
      description: "Mercury's favorable position enhances communication and analytical thinking. Excellent day for important meetings, negotiations, and financial decisions. Your professional reputation may receive boost.",
      keyPoints: ["Clear communication", "Financial gains", "Professional recognition"],
      iconColor: "#FF7F39"
    },
    {
      id: 4,
      title: "Health & Wellness Predictions",
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      category: "Health Focus",
      icon: <AutoAwesome sx={{ fontSize: 32, color: 'white' }} />,
      description: "The Moon's healing energy supports physical and emotional well-being today. Focus on nurturing activities, proper nutrition, and stress management. Listen to your body's needs.",
      keyPoints: ["Physical vitality", "Emotional balance", "Self-care focus"],
      iconColor: "#FF7F39"
    },
    {
      id: 5,
      title: "Spiritual Growth & Awakening",
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      category: "Spiritual",
      icon: <AutoAwesome sx={{ fontSize: 32, color: 'white' }} />,
      description: "Neptune's mystical influence opens pathways to higher consciousness and spiritual insights. Meditation, prayer, and contemplative practices are especially powerful today.",
      keyPoints: ["Spiritual awakening", "Intuitive insights", "Inner peace"],
      iconColor: "#FF7F39"
    }
  ];

  // Fixed: Always show 3 cards on desktop/tablet, 1 on mobile
  const getCardsPerView = () => {
    if (isMobile) return 1;
    return 3; // Always 3 cards on desktop and tablet
  };

  const cardsPerView = getCardsPerView();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  
  // Create extended list for seamless infinite scroll
  const extendedCards = [...horoscopeCards, ...horoscopeCards];

  // Auto-scroll effect - exactly like in the image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 3500); // Every 3.5 seconds for smooth auto-scroll

    return () => clearInterval(interval);
  }, []);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentIndex >= horoscopeCards.length) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(0);
        
        const reenableTimer = setTimeout(() => {
          setIsTransitionEnabled(true);
        }, 50);

        return () => clearTimeout(reenableTimer);
      }, 500); // Faster transition

      return () => clearTimeout(timer);
    }
  }, [currentIndex, horoscopeCards.length]);

  const handlePrevious = () => {
    setCurrentIndex(prev => prev === 0 ? horoscopeCards.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <Box sx={{ 
      py: { xs: 6, md: 8 }, 
      background: '#F5F7FA',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box maxWidth="1400px" sx={{ mx: 'auto', px: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <Typography sx={{ 
              color: '#FF7F39', 
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              ✨ NS LIVE Courses
            </Typography>
          </Box>
          
          <Typography
            variant="h3"
            sx={{
              color: '#2D4A87',
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 2
            }}
          >
            NS Astrology Courses
          </Typography>
        </Box>

        {/* Cards Container */}
        <Box sx={{ 
          position: 'relative',
          overflow: "hidden",
          mx: { xs: 0, md: 2 }
        }}>
          {/* Navigation Arrows - Only show on desktop */}
          {!isMobile && (
            <>
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: 'absolute',
                  left: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: 50,
                  height: 50,
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '2px solid #E5E5E5',
                  color: '#FF7F39',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  '&:hover': {
                    background: '#FF7F39',
                    color: 'white',
                    transform: 'translateY(-50%) scale(1.1)',
                    borderColor: '#FF7F39'
                  }
                }}
              >
                <ChevronLeft fontSize="large" />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: 50,
                  height: 50,
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '2px solid #E5E5E5',
                  color: '#FF7F39',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  '&:hover': {
                    background: '#FF7F39',
                    color: 'white',
                    transform: 'translateY(-50%) scale(1.1)',
                    borderColor: '#FF7F39'
                  }
                }}
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </>
          )}

          {/* Cards Slider */}
          <Box
            sx={{
              display: "flex",
              transition: isTransitionEnabled ? "transform 0.5s ease-in-out" : "none",
              transform: `translateX(-${currentIndex * (100 / horoscopeCards.length)}%)`,
              width: `${extendedCards.length * (100 / cardsPerView)}%`
            }}
          >
            {extendedCards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  flex: `0 0 ${100 / extendedCards.length}%`,
                  px: { xs: 1, md: 2 }
                }}
              >
                <Box
                  sx={{
                    background: "white",
                    borderRadius: 3,
                    p: { xs: 3, md: 4 },
                    height: { xs: 'auto', md: '420px' },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    mx: 1,
                    '&:hover': {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.12)"
                    }
                  }}
                >
                  {/* Circular Icon with Dashed Border */}
                  <Box sx={{ 
                    position: 'relative',
                    mb: 3
                  }}>
                    <Box
                      sx={{
                        width: { xs: 70, md: 80 },
                        height: { xs: 70, md: 80 },
                        borderRadius: '50%',
                        background: card.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        mx: 'auto'
                      }}
                    >
                      {card.icon}
                    </Box>
                    
                    {/* Dashed Circle Border */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        left: -8,
                        width: { xs: 86, md: 96 },
                        height: { xs: 86, md: 96 },
                        borderRadius: '50%',
                        border: `2px dashed ${card.iconColor}`,
                        opacity: 0.4
                      }}
                    />
                  </Box>

                  {/* Title - Matching exact text from image */}
                  <Typography 
                    variant="h6"
                    sx={{ 
                      fontWeight: 700,
                      color: "#2D4A87",
                      mb: 1.5,
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      lineHeight: 1.3,
                      minHeight: { xs: 'auto', md: '60px' },
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* Orange Divider */}
                  <Box
                    sx={{
                      width: 50,
                      height: 3,
                      background: '#FF7F39',
                      borderRadius: 1.5,
                      mb: 2.5,
                      mx: 'auto'
                    }}
                  />

                  {/* Description - Hidden on mobile to match design */}
                  {!isMobile && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: "0.9rem", 
                        color: "#666",
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2,
                        flex: 1,
                        maxWidth: '90%'
                      }}
                    >
                      {card.description}
                    </Typography>
                  )}

                  {/* Category Tag */}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontSize: { xs: "0.75rem", md: "0.8rem" }, 
                      color: "#999",
                      fontWeight: 500,
                      mt: isMobile ? 2 : 'auto',
                      px: 2,
                      py: 0.5,
                      background: 'rgba(255,127,57,0.1)',
                      borderRadius: 1,
                      border: '1px solid rgba(255,127,57,0.2)'
                    }}
                  >
                    {card.category}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Blog;