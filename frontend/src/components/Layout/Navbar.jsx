import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle, Close } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleClose();
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    ...(user?.role === "admin" ? [{ label: "Admin", path: "/admin" }] : []),
  ];

  const drawer = (
    <Box sx={{ width: 280, height: '100%', background: 'linear-gradient(135deg, #F5FAE1 0%, #EEE6CA 100%)' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(137,108,108,0.2)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img
              src="/images/logo/logo.png"
              alt="Rashi Guru Logo"
              style={{ height: "30px", width: "auto" }}
            />
            <Typography variant="h6" sx={{ color: '#896C6C', fontWeight: 700 }}>
              Rashi Guru
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#896C6C' }}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      
      <List sx={{ px: 1, py: 2 }}>
        {navItems.map((item, index) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 2,
                mx: 1,
                py: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(137,108,108,0.1)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: '#896C6C'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {user && (
        <>
          <Divider sx={{ mx: 2 }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Signed in as:
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#896C6C' }}>
              {user.name}
            </Typography>
            {user.role === 'admin' && (
              <Typography variant="caption" sx={{ color: '#FF9800' }}>
                Administrator
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ 
          backgroundColor: "#EEE6CA", 
          color: "black",
          borderBottom: '2px solid rgba(137,108,108,0.1)',
          boxShadow: '0 4px 20px rgba(137,108,108,0.1)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ 
                  mr: 2,
                  color: '#896C6C',
                  '&:hover': {
                    backgroundColor: 'rgba(137,108,108,0.1)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box 
              sx={{ 
                flexGrow: 1, 
                cursor: "pointer",
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, md: 2 }
              }}
              onClick={() => navigate("/")}
            >
              <img
                src="/images/logo/logo.png"
                alt="Rashi Guru Logo"
                style={{ 
                  height: isMobile ? "35px" : "45px", 
                  width: "auto", 
                  verticalAlign: "middle" 
                }}
              />
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{ 
                  fontWeight: 700,
                  color: '#896C6C',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Rashi Guru
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    sx={{
                      fontSize: { sm: "0.95rem", md: "1rem", lg: "1.1rem" },
                      textTransform: "none",
                      fontWeight: 600,
                      color: '#896C6C',
                      px: { sm: 1.5, md: 2 },
                      py: 1,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'rgba(137,108,108,0.1)',
                        transform: 'translateY(-2px)',
                        '&::after': {
                          width: '100%'
                        }
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: '2px',
                        background: '#896C6C',
                        transition: 'width 0.3s ease'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box>
              <IconButton 
                size="large" 
                onClick={handleMenu} 
                color="inherit"
                sx={{
                  color: '#896C6C',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(137,108,108,0.1)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                {user ? (
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40,
                      backgroundColor: '#896C6C',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(137,108,108,0.3)'
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </Avatar>
                ) : (
                  <AccountCircle sx={{ fontSize: 35 }} />
                )}
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 200,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(229,190,181,0.1) 100%)',
                    border: '1px solid rgba(137,108,108,0.2)',
                    boxShadow: '0 8px 32px rgba(137,108,108,0.15)'
                  }
                }}
              >
                {user ? (
                  [
                    <MenuItem 
                      key="profile" 
                      onClick={handleClose}
                      sx={{ 
                        py: 1.5,
                        borderBottom: '1px solid rgba(137,108,108,0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(137,108,108,0.05)'
                        }
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#896C6C' }}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                        {user.role === 'admin' && (
                          <Typography variant="caption" sx={{ color: '#FF9800', fontWeight: 500 }}>
                            Administrator
                          </Typography>
                        )}
                      </Box>
                    </MenuItem>,
                    <MenuItem 
                      key="logout" 
                      onClick={handleLogout}
                      sx={{ 
                        py: 1.5,
                        color: '#d32f2f',
                        '&:hover': {
                          backgroundColor: 'rgba(211,47,47,0.05)'
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Logout
                      </Typography>
                    </MenuItem>,
                  ]
                ) : (
                  [
                    <MenuItem
                      key="login"
                      onClick={() => {
                        navigate("/login");
                        handleClose();
                      }}
                      sx={{ 
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'rgba(137,108,108,0.05)'
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500, color: '#896C6C' }}>
                        Login
                      </Typography>
                    </MenuItem>,
                    <MenuItem
                      key="register"
                      onClick={() => {
                        navigate("/register");
                        handleClose();
                      }}
                      sx={{ 
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'rgba(137,108,108,0.05)'
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500, color: '#896C6C' }}>
                        Register
                      </Typography>
                    </MenuItem>,
                  ]
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;