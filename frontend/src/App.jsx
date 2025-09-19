import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!user) return <Navigate to="/login" />;
    if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
    return children;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;