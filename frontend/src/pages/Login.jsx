import React, { useState } from 'react';
import {
  Container, Paper, TextField, Button, Typography, Box, Alert,
  InputAdornment, IconButton, useTheme, useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Handle admin login
      if (formData.email === 'admin@mysite.com' && formData.password === 'admin@mywebsite') {
        // Mock admin login
        const mockAdminResponse = {
          user: { 
            id: 1, 
            name: 'Admin', 
            email: 'admin@mysite.com', 
            role: 'admin' 
          },
          token: 'mock-admin-token'
        };
        
        localStorage.setItem('token', mockAdminResponse.token);
        localStorage.setItem('user', JSON.stringify(mockAdminResponse.user));
        
        // Set user in auth context manually for admin
        navigate('/admin');
        window.location.reload(); // Force refresh to update auth context
        return;
      }
      
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        py: { xs: 4, sm: 6, md: 8 }, 
        px: { xs: 2, sm: 3 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, sm: 4, md: 5 },
          width: '100%',
          background: 'linear-gradient(135deg, rgba(229,190,181,0.1) 0%, rgba(245,250,225,0.1) 100%)',
          border: '1px solid rgba(137, 108, 108, 0.2)',
          borderRadius: { xs: 2, md: 3 },
          boxShadow: '0 8px 32px rgba(137, 108, 108, 0.15)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"}
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mb: 1
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to access your astrology portal
          </Typography>
        </Box>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: { xs: '0.875rem', md: '1rem' }
              }
            }}
          >
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-root': {
                fontSize: { xs: '0.875rem', md: '1rem' }
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
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size={isMobile ? "small" : "medium"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3,
              '& .MuiInputBase-root': {
                fontSize: { xs: '0.875rem', md: '1rem' }
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
              py: { xs: 1.5, md: 2 }, 
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              mb: 2,
              background: 'linear-gradient(135deg, #896C6C 0%, #6B5555 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #6B5555 0%, #896C6C 100%)',
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: '#896C6C', 
                textDecoration: 'none', 
                fontWeight: 600 
              }}
            >
              Create Account
            </Link>
          </Typography>
          
          <Box 
            sx={{ 
              mt: 3, 
              p: { xs: 1.5, md: 2 }, 
              bgcolor: 'rgba(137, 108, 108, 0.05)', 
              borderRadius: 2,
              border: '1px solid rgba(137, 108, 108, 0.1)'
            }}
          >
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
            >
              <strong>Admin Access:</strong><br />
              Email: admin@mysite.com<br />
              Password: admin@mywebsite
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;