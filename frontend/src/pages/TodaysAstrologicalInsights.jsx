import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import api from "../services/api";

const TodaysAstrologicalInsights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const response = await api.get("/insights/today");
        setInsights(response.data.data);
      } catch (err) {
        console.error("Error fetching today's insights:", err);
        setError("Failed to load astrological insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, background: "#f8f4f2" }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h4" : "h2"}
            align="center"
            sx={{
              color: "#896C6C",
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Today's Astrological Insights ✨
          </Typography>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(137,108,108,0.1)",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                    <Skeleton variant="text" height={40} width="80%" sx={{ mb: 2 }} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, background: "#f8f4f2" }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "#f8f4f2",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? "h4" : "h2"}
          align="center"
          sx={{
            color: "#896C6C",
            fontWeight: 700,
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          Today's Astrological Insights ✨
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {insights?.map((insight, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(137,108,108,0.1)",
                  borderRadius: 3,
                  boxShadow: "0 10px 30px rgba(137,108,108,0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px) scale(1.02)",
                    boxShadow: "0 15px 40px rgba(137,108,108,0.2)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: "#896C6C",
                      mb: 1,
                      fontSize: { xs: "1.2rem", md: "1.35rem" },
                      lineHeight: 1.3,
                    }}
                  >
                    {insight.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#5A5A5A",
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {insight.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TodaysAstrologicalInsights;