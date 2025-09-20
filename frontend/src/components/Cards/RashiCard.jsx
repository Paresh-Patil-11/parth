import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Grid, Card, CardContent, Chip,
  useTheme, useMediaQuery
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RashiCard = ({ rashi, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getRashiData = (rashiName) => {
    const rashiDatabase = {
      'Mesha (Aries)': {
        element: 'Fire',
        quality: 'Cardinal',
        ruler: 'Mars',
        luckyColors: ['Red', 'Orange', 'Yellow'],
        luckyNumbers: [1, 8, 17, 26],
        personality: 'Bold, energetic, natural leader, impulsive, competitive',
        strengths: 'Courageous, determined, confident, enthusiastic, optimistic',
        weaknesses: 'Impatient, moody, short-tempered, impulsive, aggressive',
        description: 'Aries are the pioneers of the zodiac. They are energetic, dynamic, and eager to get things started. They have a natural ability to lead and inspire others.',
        careerData: [
          { name: 'Leadership', value: 25, color: '#896C6C' },
          { name: 'Military/Sports', value: 20, color: '#E5BEB5' },
          { name: 'Entrepreneurship', value: 20, color: '#F5FAE1' },
          { name: 'Engineering', value: 15, color: '#EEE6CA' },
          { name: 'Others', value: 20, color: '#A88585' }
        ],
        healthData: [
          { name: 'Head/Brain', value: 30, color: '#896C6C' },
          { name: 'Energy Levels', value: 25, color: '#E5BEB5' },
          { name: 'Blood Pressure', value: 20, color: '#F5FAE1' },
          { name: 'Accidents Prone', value: 15, color: '#EEE6CA' },
          { name: 'General Health', value: 10, color: '#A88585' }
        ],
        marriageData: [
          { name: 'Compatibility', value: 20, color: '#896C6C' },
          { name: 'Leadership', value: 25, color: '#E5BEB5' },
          { name: 'Passion', value: 30, color: '#F5FAE1' },
          { name: 'Communication', value: 15, color: '#EEE6CA' },
          { name: 'Patience', value: 10, color: '#A88585' }
        ],
        luckData: [
          { name: 'Financial', value: 22, color: '#896C6C' },
          { name: 'Career', value: 28, color: '#E5BEB5' },
          { name: 'Health', value: 20, color: '#F5FAE1' },
          { name: 'Relationships', value: 15, color: '#EEE6CA' },
          { name: 'Spiritual', value: 15, color: '#A88585' }
        ]
      },
      'Vrishabha (Taurus)': {
        element: 'Earth',
        quality: 'Fixed',
        ruler: 'Venus',
        luckyColors: ['Green', 'Pink', 'White'],
        luckyNumbers: [2, 6, 9, 12],
        personality: 'Reliable, patient, practical, devoted, stable',
        strengths: 'Reliable, patient, practical, devoted, responsible',
        weaknesses: 'Stubborn, possessive, uncompromising, materialistic',
        description: 'Taurus individuals are grounded, reliable, and have a great appreciation for beauty and luxury. They value stability and security in all aspects of life.',
        careerData: [
          { name: 'Banking/Finance', value: 25, color: '#896C6C' },
          { name: 'Agriculture', value: 20, color: '#E5BEB5' },
          { name: 'Arts/Music', value: 20, color: '#F5FAE1' },
          { name: 'Real Estate', value: 15, color: '#EEE6CA' },
          { name: 'Others', value: 20, color: '#A88585' }
        ],
        healthData: [
          { name: 'Throat/Neck', value: 30, color: '#896C6C' },
          { name: 'Weight Management', value: 25, color: '#E5BEB5' },
          { name: 'Diabetes', value: 20, color: '#F5FAE1' },
          { name: 'Skin Issues', value: 15, color: '#EEE6CA' },
          { name: 'General Health', value: 10, color: '#A88585' }
        ],
        marriageData: [
          { name: 'Loyalty', value: 30, color: '#896C6C' },
          { name: 'Stability', value: 25, color: '#E5BEB5' },
          { name: 'Romance', value: 20, color: '#F5FAE1' },
          { name: 'Flexibility', value: 10, color: '#EEE6CA' },
          { name: 'Communication', value: 15, color: '#A88585' }
        ],
        luckData: [
          { name: 'Financial', value: 30, color: '#896C6C' },
          { name: 'Career', value: 20, color: '#E5BEB5' },
          { name: 'Health', value: 20, color: '#F5FAE1' },
          { name: 'Relationships', value: 20, color: '#EEE6CA' },
          { name: 'Spiritual', value: 10, color: '#A88585' }
        ]
      },
      'Mithuna (Gemini)': {
        element: 'Air',
        quality: 'Mutable',
        ruler: 'Mercury',
        luckyColors: ['Yellow', 'Light Blue', 'White'],
        luckyNumbers: [5, 7, 14, 23],
        personality: 'Adaptable, curious, good communicator, versatile, witty',
        strengths: 'Gentle, affectionate, curious, adaptable, quick learner',
        weaknesses: 'Nervous, inconsistent, indecisive, superficial',
        description: 'Geminis are social butterflies with a dual nature. They are intelligent, adaptable, and excellent communicators who love to learn and share knowledge.',
        careerData: [
          { name: 'Communication', value: 30, color: '#896C6C' },
          { name: 'Writing/Media', value: 25, color: '#E5BEB5' },
          { name: 'Teaching', value: 20, color: '#F5FAE1' },
          { name: 'Sales/Marketing', value: 15, color: '#EEE6CA' },
          { name: 'Others', value: 10, color: '#A88585' }
        ],
        healthData: [
          { name: 'Nervous System', value: 30, color: '#896C6C' },
          { name: 'Respiratory', value: 25, color: '#E5BEB5' },
          { name: 'Hands/Arms', value: 20, color: '#F5FAE1' },
          { name: 'Mental Health', value: 15, color: '#EEE6CA' },
          { name: 'General Health', value: 10, color: '#A88585' }
        ],
        marriageData: [
          { name: 'Communication', value: 35, color: '#896C6C' },
          { name: 'Intellectual Bond', value: 25, color: '#E5BEB5' },
          { name: 'Variety', value: 20, color: '#F5FAE1' },
          { name: 'Commitment', value: 10, color: '#EEE6CA' },
          { name: 'Emotional Depth', value: 10, color: '#A88585' }
        ],
        luckData: [
          { name: 'Communication', value: 30, color: '#896C6C' },
          { name: 'Learning', value: 25, color: '#E5BEB5' },
          { name: 'Travel', value: 20, color: '#F5FAE1' },
          { name: 'Networking', value: 15, color: '#EEE6CA' },
          { name: 'Spiritual', value: 10, color: '#A88585' }
        ]
      },
      // Add more rashis with default data for others
    };

    return rashiDatabase[rashiName] || {
      element: 'Unknown',
      quality: 'Unknown',
      ruler: 'Unknown',
      luckyColors: ['Blue'],
      luckyNumbers: [1, 2, 3],
      personality: 'Data not available',
      strengths: 'Data not available',
      weaknesses: 'Data not available',
      description: 'Detailed information for this zodiac sign is being updated.',
      careerData: [
        { name: 'General', value: 100, color: '#896C6C' }
      ],
      healthData: [
        { name: 'General', value: 100, color: '#896C6C' }
      ],
      marriageData: [
        { name: 'General', value: 100, color: '#896C6C' }
      ],
      luckData: [
        { name: 'General', value: 100, color: '#896C6C' }
      ]
    };
  };

  const rashiDetails = rashi ? getRashiData(rashi.name) : null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'white',
            p: 1.5,
            border: '1px solid #ccc',
            borderRadius: 1,
            boxShadow: 2
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {`${payload[0].name}: ${payload[0].value}%`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const ChartCard = ({ title, data, description }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: 'linear-gradient(135deg, rgba(229,190,181,0.05) 0%, rgba(245,250,225,0.05) 100%)',
        border: '1px solid rgba(137, 108, 108, 0.1)'
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom color="primary.main" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
          {description}
        </Typography>
        <Box sx={{ height: { xs: 200, md: 250 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 60 : 80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
                fontSize={isMobile ? 10 : 12}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }}
                iconSize={isMobile ? 12 : 18}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          maxHeight: isMobile ? '100vh' : '90vh',
          m: isMobile ? 0 : 2
        }
      }}
    >
      {rashi && rashiDetails && (
        <>
          <DialogTitle 
            sx={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #896C6C 0%, #E5BEB5 100%)',
              color: 'white',
              borderRadius: isMobile ? 0 : '12px 12px 0 0',
              p: { xs: 2, md: 3 }
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: { xs: 1, md: 2 },
                flexDirection: isMobile ? 'column' : 'row'
              }}
            >
              <Box
                component="img"
                src={rashi.img}
                alt={rashi.name}
                sx={{
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  borderRadius: '50%',
                  border: '3px solid white'
                }}
              />
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                sx={{ fontWeight: 700, textAlign: 'center' }}
              >
                {rashi.name}
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Card 
                  sx={{ 
                    mb: 3, 
                    background: 'linear-gradient(135deg, rgba(229,190,181,0.1) 0%, rgba(245,250,225,0.1) 100%)',
                    border: '1px solid rgba(137, 108, 108, 0.1)'
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant={isMobile ? "h6" : "h5"} gutterBottom color="primary.main" sx={{ fontWeight: 600 }}>
                      Basic Information
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {rashiDetails.description}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle2" color="text.secondary">Element:</Typography>
                        <Chip label={rashiDetails.element} color="primary" size="small" sx={{ mt: 0.5 }} />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle2" color="text.secondary">Quality:</Typography>
                        <Chip label={rashiDetails.quality} color="secondary" size="small" sx={{ mt: 0.5 }} />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle2" color="text.secondary">Ruler:</Typography>
                        <Chip label={rashiDetails.ruler} color="info" size="small" sx={{ mt: 0.5 }} />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle2" color="text.secondary">Lucky Numbers:</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {rashiDetails.luckyNumbers.join(', ')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">Lucky Colors:</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                        {rashiDetails.luckyColors.map((color, index) => (
                          <Chip
                            key={index}
                            label={color}
                            size="small"
                            sx={{
                              backgroundColor: color.toLowerCase() === 'white' ? '#f5f5f5' : color.toLowerCase(),
                              color: ['yellow', 'white', 'pink'].includes(color.toLowerCase()) ? 'black' : 'white',
                              fontWeight: 500
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Personality Traits */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%', border: '1px solid rgba(137, 108, 108, 0.1)' }}>
                      <CardContent>
                        <Typography variant="h6" color="primary.main" gutterBottom>Personality</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rashiDetails.personality}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
                      <CardContent>
                        <Typography variant="h6" color="success.main" gutterBottom>Strengths</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rashiDetails.strengths}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%', border: '1px solid rgba(244, 67, 54, 0.3)' }}>
                      <CardContent>
                        <Typography variant="h6" color="error.main" gutterBottom>Challenges</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rashiDetails.weaknesses}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Charts */}
              <Grid item xs={12} md={6}>
                <ChartCard
                  title="Career Prospects"
                  data={rashiDetails.careerData}
                  description="Career fields where this zodiac sign typically excels"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ChartCard
                  title="Health Areas"
                  data={rashiDetails.healthData}
                  description="Health aspects to pay attention to"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ChartCard
                  title="Marriage & Relationships"
                  data={rashiDetails.marriageData}
                  description="Relationship qualities and compatibility factors"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ChartCard
                  title="Luck Factors"
                  data={rashiDetails.luckData}
                  description="Areas where fortune typically favors this sign"
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ p: { xs: 2, md: 3 } }}>
            <Button 
              onClick={onClose} 
              variant="contained"
              sx={{
                borderRadius: 2,
                px: { xs: 3, md: 4 },
                py: 1.5,
                background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
                }
              }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default RashiCard;