import React, { useState, useEffect, useCallback } from "react";
import { useTheme, useMediaQuery, Box, Typography, Rating, IconButton } from '@mui/material';
import { FormatQuote, ChevronLeft, ChevronRight } from '@mui/icons-material';

const DailyHoroscope = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const feedbacks = [
    { name: "Samar Patel", feedback: "The astrology consultation was incredibly accurate and insightful. The predictions about my career change came true within months.", image: "/images/user1.jpg", date: "16 October 2024", rating: 5, location: "Mumbai, India", profession: "Software Engineer" },
    { name: "Riya Sharma", feedback: "Amazing experience! The marriage compatibility report helped us understand each other better. The remedies suggested worked wonderfully.", image: "/images/user2.jpg", date: "10 October 2024", rating: 5, location: "Delhi, India", profession: "Teacher" },
    { name: "Arjun Reddy", feedback: "Very professional service with detailed analysis. The health predictions were spot-on and helped me take preventive measures.", image: "/images/user3.jpg", date: "05 October 2024", rating: 5, location: "Hyderabad, India", profession: "Business Owner" },
    { name: "Meera Gupta", feedback: "Great guidance for career decisions. The timing predictions for job changes were incredibly accurate. I got my dream job exactly when predicted!", image: "/images/user4.jpg", date: "02 October 2024", rating: 4, location: "Bangalore, India", profession: "Marketing Manager" },
    { name: "Rohit Kumar", feedback: "Truly helpful financial guidance. The investment timing suggestions helped me make profitable decisions. The remedies are simple yet effective.", image: "/images/user5.jpg", date: "01 October 2024", rating: 5, location: "Pune, India", profession: "Financial Analyst" },
    { name: "Priya Singh", feedback: "The Vastu consultation transformed my home's energy completely. I feel more peaceful and positive since implementing the changes.", image: "/images/user6.jpg", date: "28 September 2024", rating: 5, location: "Jaipur, India", profession: "Interior Designer" },
  ];

  const cardsPerView = isMobile ? 1 : 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  // Create the extended list for a seamless loop
  const extendedFeedbacks = [...feedbacks, ...feedbacks];

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => prev + cardsPerView);
  }, [cardsPerView]);

  // Auto-scroll effect: now moves by a full page
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // The animation triggers every 3 seconds

    return () => clearInterval(interval);
  }, [handleNext]);

  // Handle infinite loop reset
  useEffect(() => {
    // We check for greater OR equal to handle cases where cardsPerView isn't a perfect divisor
    if (currentIndex >= feedbacks.length) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        // Reset to the beginning
        setCurrentIndex(0);
        
        const reenableTimer = setTimeout(() => {
          setIsTransitionEnabled(true);
        }, 50);

        return () => clearTimeout(reenableTimer);
      }, 700); // This MUST match the transition duration (0.7s)

      return () => clearTimeout(timer);
    }
  }, [currentIndex, feedbacks.length]);

  const handlePrevious = () => {
    setCurrentIndex(prev => {
      // If at the start, jump to the last page
      if (prev === 0) {
        return feedbacks.length - cardsPerView;
      }
      return prev - cardsPerView;
    });
  };

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, background: "#F5F7FA", overflow: 'hidden' }}>
      <Box maxWidth="1400px" sx={{ mx: 'auto', px: { xs: 2, md: 3 }, position: 'relative' }}>
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography sx={{ color: '#FF7F39', fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            ✨ NS LIVE Testimonials
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#2D4A87', fontSize: { xs: '1.8rem', md: '2.2rem' }, mb: 1 }}>
            Client Success Stories
          </Typography>
        </Box>

        {/* Cards Container */}
        <Box sx={{ position: 'relative', overflow: "hidden" }}>
          
          {/* Navigation Arrows */}
          {!isMobile && (
            <>
              <IconButton onClick={handlePrevious} sx={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10, bgcolor: 'white', '&:hover': { bgcolor: '#FF7F39', color: 'white' }, boxShadow: 3 }}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleNext} sx={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10, bgcolor: 'white', '&:hover': { bgcolor: '#FF7F39', color: 'white' }, boxShadow: 3 }}>
                <ChevronRight />
              </IconButton>
            </>
          )}

          {/* Cards Slider */}
          <Box
            sx={{
              display: "flex",
              // *** FIX #1: Use 'ease-in-out' for a slide-and-stop effect ***
              transition: isTransitionEnabled ? "transform 0.7s ease-in-out" : "none",
              // The transform calculation remains correct
              transform: `translateX(-${currentIndex * (100 / extendedFeedbacks.length)}%)`,
              width: `${(extendedFeedbacks.length / cardsPerView)}%`
            }}
          >
            {extendedFeedbacks.map((item, index) => (
              <Box key={index} sx={{ flex: `0 0 ${100 / extendedFeedbacks.length}%`, px: { xs: 1, md: 2 } }}>
                <Box
                  sx={{
                    background: "white",
                    borderRadius: 3,
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    minHeight: { xs: 380, md: 420 },
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ position: 'relative', mb: 3 }}>
                     <Box sx={{ width: { xs: 70, md: 80 }, height: { xs: 70, md: 80 }, borderRadius: '50%', background: '#FF7F39', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, mx: 'auto' }}>
                       <FormatQuote sx={{ fontSize: { xs: 28, md: 32 }, color: 'white' }} />
                     </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#2D4A87", mb: 1.5, fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.3 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mb: 2, fontSize: { xs: '0.85rem', md: '0.9rem' }, fontWeight: 500 }}>
                    {item.profession} • {item.location}
                  </Typography>
                  <Rating value={item.rating} readOnly sx={{ mb: 2.5, '& .MuiRating-iconFilled': { color: '#FFD700' } }} />
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" }, color: "#444", lineHeight: 1.5, fontStyle: "italic", flexGrow: 1, mb: 2 }}>
                    "{item.feedback}"
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: { xs: "0.75rem", md: "0.8rem" }, color: "#999", fontWeight: 500, mt: 'auto' }}>
                    {item.date}
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

export default DailyHoroscope;