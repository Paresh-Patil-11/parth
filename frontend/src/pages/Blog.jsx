import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery, Box, Avatar, Typography, Rating } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const Blog = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const feedbacks = [
    { 
      name: "Samar Patel", 
      feedback: "The astrology consultation was incredibly accurate and insightful. The predictions about my career change came true within months. Highly recommended!", 
      image: "/images/user1.jpg", 
      date: "16 October 2024", 
      rating: 5,
      location: "Mumbai, India",
      profession: "Software Engineer"
    },
    { 
      name: "Riya Sharma", 
      feedback: "Amazing experience! The marriage compatibility report helped us understand each other better. The remedies suggested worked wonderfully for our relationship.", 
      image: "/images/user2.jpg", 
      date: "10 October 2024", 
      rating: 5,
      location: "Delhi, India",
      profession: "Teacher"
    },
    { 
      name: "Arjun Reddy", 
      feedback: "Very professional service with detailed analysis. The health predictions were spot-on and helped me take preventive measures. Thank you for the guidance!", 
      image: "/images/user3.jpg", 
      date: "05 October 2024", 
      rating: 5,
      location: "Hyderabad, India",
      profession: "Business Owner"
    },
    { 
      name: "Meera Gupta", 
      feedback: "Great guidance for career decisions. The timing predictions for job changes were incredibly accurate. I got my dream job exactly when predicted!", 
      image: "/images/user4.jpg", 
      date: "02 October 2024", 
      rating: 4,
      location: "Bangalore, India",
      profession: "Marketing Manager"
    },
    { 
      name: "Rohit Kumar", 
      feedback: "Truly helpful financial guidance. The investment timing suggestions helped me make profitable decisions. The remedies are simple yet effective.", 
      image: "/images/user5.jpg", 
      date: "01 October 2024", 
      rating: 5,
      location: "Pune, India",
      profession: "Financial Analyst"
    },
  ];

  const getCardsPerView = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const cardsPerView = getCardsPerView();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  
  // Create the extended list for a seamless loop
  const extendedFeedbacks = [...feedbacks, ...feedbacks];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Effect to handle the "infinite" loop reset
  useEffect(() => {
    if (currentIndex >= feedbacks.length) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(0);
        
        // A nested timeout to re-enable transitions after the jump
        const reenableTimer = setTimeout(() => {
          setIsTransitionEnabled(true);
        }, 50);

        return () => clearTimeout(reenableTimer);
      }, 1000); // Must match the CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [currentIndex, feedbacks.length]);

  // The width of a single card as a percentage of the total slider width
  const cardWidthPercentage = 100 / cardsPerView;

  return (
    <div style={{ 
      width: "100%", 
      margin: "auto", 
      overflow: "hidden",
      padding: isMobile ? "20px 10px" : "40px 20px",
      background: "linear-gradient(135deg, rgba(245,250,225,0.3) 0%, rgba(229,190,181,0.1) 100%)"
    }}>
      <div
        style={{
          display: "flex",
          transition: isTransitionEnabled ? "transform 1s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          transform: `translateX(-${currentIndex * cardWidthPercentage}%)`,
          width: `${(extendedFeedbacks.length / cardsPerView) * 100}%`,
          gap: isMobile ? "10px" : "20px"
        }}
      >
        {extendedFeedbacks.map((item, index) => (
          <div
            key={index}
            style={{
              flex: `0 0 ${cardWidthPercentage}%`,
              boxSizing: "border-box",
              padding: isMobile ? "10px" : "15px",
            }}
          >
            <div
              style={{
                width: "100%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.1) 100%)",
                border: "2px solid rgba(137,108,108,0.2)",
                borderRadius: "20px",
                padding: isMobile ? "20px" : "30px",
                textAlign: "center",
                boxShadow: "0 12px 40px rgba(137,108,108,0.15)",
                background: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(137,108,108,0.25)";
                e.currentTarget.style.borderColor = "#896C6C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(137,108,108,0.15)";
                e.currentTarget.style.borderColor = "rgba(137,108,108,0.2)";
              }}
            >
              {/* Quote Icon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 15,
                  left: 15,
                  color: '#896C6C',
                  opacity: 0.3
                }}
              >
                <FormatQuote sx={{ fontSize: isMobile ? 30 : 40, transform: 'rotate(180deg)' }} />
              </Box>

              {/* Top Section - Profile */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  marginBottom: "15px",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "10px" : "15px"
                }}>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: isMobile ? 80 : 100,
                      height: isMobile ? 80 : 100,
                      border: '4px solid #896C6C',
                      boxShadow: '0 8px 24px rgba(137,108,108,0.3)'
                    }}
                  />
                  <div style={{ textAlign: isMobile ? "center" : "left" }}>
                    <Typography 
                      variant={isMobile ? "h6" : "h5"}
                      sx={{ 
                        fontFamily: "Georgia, serif", 
                        fontWeight: 700,
                        color: "#896C6C",
                        marginBottom: "5px"
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#5A5A5A", 
                        fontWeight: 500,
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    >
                      {item.profession}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: "#888", 
                        display: "block",
                        fontSize: isMobile ? '0.7rem' : '0.8rem'
                      }}
                    >
                      {item.location}
                    </Typography>
                  </div>
                </div>

                {/* Rating */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                  <Rating 
                    value={item.rating} 
                    readOnly 
                    sx={{ 
                      '& .MuiRating-iconFilled': {
                        color: '#FFD700',
                      },
                      fontSize: isMobile ? '1.2rem' : '1.5rem'
                    }} 
                  />
                </Box>
              </div>

              {/* Middle Section - Feedback */}
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: isMobile ? "14px" : "16px", 
                    color: "#2C2C2C",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    textAlign: "center",
                    position: "relative",
                    paddingX: "10px"
                  }}
                >
                  "{item.feedback}"
                </Typography>
              </div>

              {/* Bottom Section - Date */}
              <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid rgba(137,108,108,0.1)" }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: isMobile ? "12px" : "14px", 
                    color: "#888",
                    fontWeight: 500
                  }}
                >
                  {item.date}
                </Typography>
              </div>

              {/* Quote Icon Bottom */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 15,
                  right: 15,
                  color: '#896C6C',
                  opacity: 0.3
                }}
              >
                <FormatQuote sx={{ fontSize: isMobile ? 30 : 40 }} />
              </Box>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;