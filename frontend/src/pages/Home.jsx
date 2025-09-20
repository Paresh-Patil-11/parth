import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Rating,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import RashiBox from "./RashiBox";
import Blog from "./Blog";
import DailyHoroscope from "./DailyHoroscope";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
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
          minHeight: { xs: "80vh", md: "90vh" },
          width: "100%",
          display: "flex",
          alignItems: { xs: "end", md: "flex-end" },
          justifyContent: "center",
          color: "white",
          textAlign: { xs: "end", md: "start" },
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
          poster="/images/hero-poster.jpg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -2,
          }}
        >
          <source src="/images/backgrounds/header.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          }}
        />

        {/* Hero Content */}
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, pb: { xs: 0, md: 1 } }}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: "800px" } }}>
            <Typography
              variant={isMobile ? "h3" : "h1"}
              gutterBottom
              sx={{
                fontWeight: 700,
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                mb: { xs: 2, md: 3 },
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}
            >
              Transform Your Life with Nisha Gupta
            </Typography>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              sx={{
                mb: { xs: 2, md: 3 },
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                fontWeight: 600,
                fontSize: { xs: "1.2rem", md: "2rem" },
              }}
            >
              Astrologer & Vastu Consultant
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "white",
                color: theme.palette.primary.main,
                py: { xs: 1.5, md: 2.5 },
                px: { xs: 3, md: 5 },
                fontSize: { xs: "1rem", md: "1.2rem" },
                fontWeight: 600,
                boxShadow: "0 8px 24px rgba(255,255,255,0.3)",
                borderRadius: 3,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.95)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 32px rgba(255,255,255,0.4)",
                },
              }}
              onClick={() => navigate("/contact")}
            >
              Schedule Consultation
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Nisha Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: "auto", md: "90vh" },
          display: "flex",
          alignItems: "center",
          py: { xs: 6, md: 10 },
          background:
            "linear-gradient(135deg, rgba(245,250,225,0.4) 0%, rgba(229,190,181,0.2) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            {/* Left Side - Text Content */}
            <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
              <Typography
                variant={isMobile ? "h4" : "h2"}
                gutterBottom
                sx={{
                  color: "#896C6C",
                  fontWeight: 700,
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                }}
              >
                Why Choose Nisha Gupta?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: "700px",
                  textAlign: "justify",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  lineHeight: 1.7,
                  mb: { xs: 3, md: 4 },
                  color: "#2C2C2C",
                }}
              >
                With extensive experience in Vedic astrology and Vastu
                consultation, Nisha Gupta offers a unique approach that goes
                beyond traditional predictions. Her methodology focuses on
                practical lifestyle adjustments and consistent habits that
                strengthen positive planetary influences, helping you move
                steadily toward your goals.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: "700px",
                  textAlign: "justify",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  lineHeight: 1.7,
                  mb: { xs: 3, md: 4 },
                  color: "#2C2C2C",
                }}
              >
                She understands your shortcomings even before you do, and guides
                you to improve them step by step through practical lifestyle
                adjustments and Vastu-based suggestions. By blending the ancient
                wisdom of Astrology and Vastu with today's modern needs, she
                offers guidance that feels both timeless and relevant.
              </Typography>

              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  background:
                    "linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.15) 100%)",
                  borderRadius: 3,
                  border: "2px solid rgba(137,108,108,0.2)",
                  mt: { xs: 4, md: 5 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontStyle: "italic",
                    color: "#896C6C",
                    fontWeight: 600,
                    textAlign: "center",
                    fontSize: { xs: "1.1rem", md: "1.35rem" },
                    lineHeight: 1.4,
                  }}
                >
                  "Vastu plays a key role in balancing planetary influences that
                  may not be fully supportive in your birth chart."
                </Typography>
              </Box>
            </Grid>

            {/* Right Side - Image */}
            <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="/images/nisha-gupta-main.jpg"
                  alt="Nisha Gupta - Astrologer & Vastu Consultant"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: 350, md: 450 },
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 4,
                    boxShadow: "0 16px 48px rgba(137,108,108,0.25)",
                    border: "4px solid #896C6C",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />

                {/* Floating Elements - Only show on larger screens */}
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: -10, md: -20 },
                    right: { xs: -10, md: -20 },
                    background:
                      "linear-gradient(135deg, #896C6C 0%, #E5BEB5 100%)",
                    color: "white",
                    p: { xs: 1.5, md: 2 },
                    borderRadius: "50%",
                    boxShadow: "0 8px 24px rgba(137,108,108,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      textAlign: "center",
                      fontSize: { xs: "0.65rem", md: "0.75rem" },
                    }}
                  >
                    Vastu
                    <br />
                    Expert
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: -10, md: -15 },
                    left: { xs: -10, md: -15 },
                    background:
                      "linear-gradient(135deg, #E5BEB5 0%, #F5FAE1 100%)",
                    color: "#896C6C",
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    boxShadow: "0 8px 24px rgba(137,108,108,0.2)",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", md: "0.85rem" },
                      textAlign: "center",
                    }}
                  >
                    15+ Years
                    <br />
                    Experience
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Preview */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: "rgba(255,255,255,0.9)" }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h4" : "h2"}
            align="center"
            gutterBottom
            sx={{
              color: "#896C6C",
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Specialized Consultation Services
          </Typography>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {[
              {
                title: "Vastu Consultation",
                description:
                  "Balance planetary influences through strategic space alignment and energy optimization for homes and offices.",
                icon: "🏠",
                path: "/Services",
              },
              {
                title: "Health Consultation",
                description:
                  "Explore planetary influences on your well-being and discover the lifestyle changes essential for a healthier tomorrow.",
                icon: "🌿",
                path: "/Services",
              },
              {
                title: "Career Guidance",
                description:
                  "Identify subtle shifts in attitude and perspective that reveal whether your current career direction supports your growth.",
                icon: "💼",
                path: "/Services",
              },
              {
                title: "Marriage & Relationships",
                description:
                  "Uncover patterns, hidden challenges, and personal blind spots to guide you toward stronger connections.",
                icon: "💕",
                path: "/Services",
              },
              {
                title: "Parenting & Children",
                description:
                  "Map a path for your children's brighter future with supportive parenting techniques and lifestyle adjustments.",
                icon: "👶",
                path: "/Services",
              },
              {
                title: "Financial Prosperity",
                description:
                  "Examine your horoscope for habits and energies blocking financial flow and discover realistic changes for abundance.",
                icon: "💰",
                path: "/Services",
              },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  onClick={() => navigate(service.path)}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.05) 100%)",
                    border: "2px solid rgba(137,108,108,0.1)",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 20px 60px rgba(137,108,108,0.2)",
                      borderColor: "#896C6C",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      textAlign: "center",
                      p: { xs: 3, md: 4 },
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{ mb: 2, fontSize: { xs: "2.5rem", md: "3rem" } }}
                    >
                      {service.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#896C6C",
                        fontWeight: 600,
                        mb: 2,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.6,
                        color: "#5A5A5A",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: { xs: 6, md: 8 } }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/services")}
              sx={{
                py: { xs: 1.5, md: 2 },
                px: { xs: 3, md: 4 },
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
                background: "linear-gradient(135deg, #896C6C 0%, #6B5555 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #6B5555 0%, #896C6C 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(137,108,108,0.3)",
                },
              }}
            >
              Explore All Services
            </Button>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background:
            "linear-gradient(135deg, rgba(229,190,181,0.1) 0%, rgba(245,250,225,0.3) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <RashiBox />
        </Container>
      </Box>
      <Blog />
      <DailyHoroscope />
    </Box>
  );
};

export default Home;
