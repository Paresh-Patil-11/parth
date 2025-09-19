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
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
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
    <Box sx={{ width: 250 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#EEE6CA", color: "black" }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img
              src="/images/logo/logo.png"
              alt="Rashi Guru Logo"
              style={{ height: "40px", width: "auto", verticalAlign: "middle" }}
            />{" "}
            Rashi Guru
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, mr: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{
                    fontSize: { xs: "12px", sm: "14px", md: "16px" }, // mobile, tablet, laptop
                    textTransform: "none", // keeps text as "Home" instead of "HOME"
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              {user ? (
                <Avatar sx={{ width: 32, height: 32 }}>{user.name[0]}</Avatar>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user
                ? [
                    <MenuItem key="profile" onClick={handleClose}>
                      {user.name}
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                      Logout
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="login"
                      onClick={() => {
                        navigate("/login");
                        handleClose();
                      }}
                    >
                      Login
                    </MenuItem>,
                    <MenuItem
                      key="register"
                      onClick={() => {
                        navigate("/register");
                        handleClose();
                      }}
                    >
                      Register
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
