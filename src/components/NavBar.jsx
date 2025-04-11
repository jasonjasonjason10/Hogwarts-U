// import React from "react";
// import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const { token, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     alert("Logged out!");
//     navigate("/login");
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         mb: 4,
//         backgroundColor: "#3c1361",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography
//           variant="h5"
//           sx={{
//             fontFamily: "Slithy, serif",
//             letterSpacing: "1px",
//             fontWeight: "bold",
//           }}
//         >
//           Hogwarts U
//         </Typography>

//         <Box>
//           <Button color="inherit" component={Link} to="/">
//             Home
//           </Button>
//           <Button color="inherit" component={Link} to="/faculty">
//             Faculty
//           </Button>
//           <Button color="inherit" component={Link} to="/departments">
//             Departments
//           </Button>
//           {token && (
//             <Button color="inherit" component={Link} to="/admin">
//               Dashboard
//             </Button>
//           )}
//           {token ? (
//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           ) : (
//             <>
//               <Button color="inherit" component={Link} to="/login">
//                 Login
//               </Button>
//               <Button color="inherit" component={Link} to="/register">
//                 Register
//               </Button>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const NavBar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    alert("Logged out!");
    navigate("/login");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: "Home", to: "/" },
    ...(token
      ? [{ text: "Dashboard", to: "/admin" }]
      : [
          { text: "Login", to: "/login" },
          { text: "Register", to: "/register" },
        ]),
    { text: "Departments", to: "/departments" },
    { text: "Faculty", to: "/faculty" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          mb: 4,
          backgroundColor: "#3c1361",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Slithy, serif",
              letterSpacing: "1px",
              fontWeight: "bold",
            }}
          >
            Hogwarts U
          </Typography>
  
          {/* Hamburger Menu for Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              edge="start"
              sx={{ color: "white" }}
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
  
          {/* Full Nav for Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/faculty">
              Faculty
            </Button>
            <Button color="inherit" component={Link} to="/departments">
              Departments
            </Button>
            {token && (
              <Button color="inherit" component={Link} to="/admin">
                Dashboard
              </Button>
            )}
            {token ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
  
      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: "#3c1361", color: "white" } }}
      >
        <Box sx={{ width: 250}} role="presentation" onClick={toggleDrawer(false)}>
          <List >
            <ListItem button component={Link} to="/">
              <ListItemText primary="Home" sx={{color: "white"}} />
            </ListItem>
            <ListItem button component={Link} to="/faculty">
              <ListItemText primary="Faculty" sx={{color: "white"}}/>
            </ListItem>
            <ListItem button component={Link} to="/departments">
              <ListItemText primary="Departments" sx={{color: "white"}} />
            </ListItem>
            {token && (
              <ListItem button component={Link} to="/admin">
                <ListItemText primary="Dashboard" sx={{color: "white"}} />
              </ListItem>
            )}
            <Divider sx={{ backgroundColor: "white" }} />
            {token ? (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <>
                <ListItem button component={Link} to="/login">
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/register">
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
  
};

export default NavBar;
