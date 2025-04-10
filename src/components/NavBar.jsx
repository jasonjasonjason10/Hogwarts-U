import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", gao: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {token && (
            <Button color="inherit" component={Link} to="/admin">
              Dashboard
            </Button>
          )}
        </Box>

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
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
