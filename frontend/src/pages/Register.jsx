import React, { useState } from 'react';
import {
  Container, Paper, TextField, Button, Typography, Box, Alert,
  IconButton, InputAdornment, useTheme, useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, rgba(245,250,225,0.3) 0%, rgba(229,190,181,0.1) 100%)',
      display: 'flex',
      alignItems: 'center',
      py: { xs: 4, md: 8 }
    }}>
      <Container maxWidth="sm">
        <Paper 
          elevation={8} 
          sx={{ 
            p: { xs: 3, md: 5 },
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.05) 100%)',
            border: '2px solid rgba(137,108,108,0.1)',
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(137,108,108,0.15)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(135deg, #896C6C 0%, #E5BEB5 100%)',
              zIndex: 1
            }
          }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, #896C6C 0%, #E5BEB5 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 24px rgba(137,108,108,0.3)'
              }}
            >
              <Person sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              sx={{ 
                fontWeight: 700,
                color: '#896C6C',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: 400, mx: 'auto' }}
            >
              Join our community and start your astrological journey with Nisha Gupta
            </Typography>
          </Box>
        
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#896C6C'
                }
              }}
            >
              {error}
            </Alert>
          )}
        
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#896C6C' }} />
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.8)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#896C6C',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#896C6C',
                    borderWidth: '2px'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#896C6C',
                }
              }}
            />
          
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#896C6C' }} />
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.8)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#896C6C',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#896C6C',
                    borderWidth: '2px'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#896C6C',
                }
              }}
            />
          
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#896C6C' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#896C6C' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.8)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#896C6C',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#896C6C',
                    borderWidth: '2px'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#896C6C',
                }
              }}
            />
          
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              margin="normal"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#896C6C' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: '#896C6C' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.8)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#896C6C',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#896C6C',
                    borderWidth: '2px'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#896C6C',
                }
              }}
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ 
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
                boxShadow: '0 8px 24px rgba(137,108,108,0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(137,108,108,0.4)'
                },
                '&:disabled': {
                  background: 'rgba(137,108,108,0.5)',
                  transform: 'none',
                  boxShadow: 'none'
                }
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                to="/login"
                style={{
                  color: '#896C6C',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#6B5555'}
                onMouseLeave={(e) => e.target.style.color = '#896C6C'}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>

          {/* Decorative Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 60,
              height: 60,
              background: 'linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.1) 100%)',
              borderRadius: '50%',
              opacity: 0.7,
              display: { xs: 'none', md: 'block' }
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, rgba(229,190,181,0.2) 0%, rgba(245,250,225,0.2) 100%)',
              borderRadius: '50%',
              opacity: 0.7,
              display: { xs: 'none', md: 'block' }
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;