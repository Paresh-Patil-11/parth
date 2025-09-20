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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import RashiBox from "./RashiBox";
import Blog from './Blog'

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
          p: 4,
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
            background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,1))",
            zIndex: -1,
          }}
        />

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h2" gutterBottom>
            Discover Your Cosmic Path
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            "The stars impel, they do not compel. What you make of your life is
            up to you."
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: "white", color: theme.palette.primary.main }}
            onClick={() => navigate("/contact")} // ✅ Navigate directly
          >
            Schedule Consultation
          </Button>
        </Container>
      </Box>

      {/* About Astrology Section */}
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left Side - 60% (Text) */}
            <Grid item xs={12} md={7}>
              <Typography variant="h3" gutterBottom>
                Why Rashi Guru
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "600px",
                  textAlign: "justify",
                  fontSize: "1.15rem",
                }}
              >
                Astrology, rooted in the ancient science of Jyotish Shastra,
                studies the influence of celestial movements on human life. It
                reveals personality traits, relationships, career paths, and
                spiritual direction by analyzing the alignment of planets and
                stars at birth. More than predictions, astrology is a guide to
                understanding life patterns and unlocking hidden strengths.
              </Typography>

              <br />

              <Typography
                variant="body1"
                sx={{
                  maxWidth: "600px",
                  textAlign: "justify",
                  fontSize: "1.15rem",
                }}
              >
                In today’s fast-paced world, astrology acts as a compass that
                connects timeless wisdom with modern living. It empowers
                individuals to make informed choices, strengthen relationships,
                and find balance in career and health. Through Rashi analysis,
                daily insights, and personalized guidance, Rashi Guru helps
                transform uncertainty into confidence and clarity.
              </Typography>
            </Grid>

            {/* Right Side - 40% (Image) */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="/public/images/logo/website_photo.png" // replace with your image path
                alt="Astrology"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Rashis Grid */}
      <RashiBox />


      {/* Reviews Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Client Testimonials
        </Typography>
              <Blog></Blog>

      </Container>
    </Box>
  );
};

export default Home;
