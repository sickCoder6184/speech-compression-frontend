import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const MotionAppBar = motion(AppBar);

const navBtnStyle = (darkMode) => ({
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1rem",
  letterSpacing: 0.5,
  color: darkMode ? "#eee" : "#111", // black text in light mode
  '&:hover': {
    color: "#90caf9",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});


export default function Navbar({
  user,
  darkMode,
  setDarkMode,
  handleLogout,
  navVisible,
}) {
  return (
    <MotionAppBar
      position="fixed"
      initial={{ y: -80 }}
      animate={{ y: navVisible ? 0 : -80 }}
      transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
      sx={{
        bgcolor: darkMode ? "rgba(17,17,17,0.7)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        px: 3,
        py: 1,
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: 1,
            color: darkMode ? "#fff" : "#111",
            textShadow: darkMode ? "0 0 6px #42a5f5" : "none",
            transition: "all 0.3s ease",
            '&:hover': { color: "#90caf9" },
          }}
        >
          Speech Compression
        </Typography>


        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button component={Link} to="/" sx={navBtnStyle(darkMode)}>Home</Button>
          <Button component={Link} to="/about" sx={navBtnStyle(darkMode)}>About</Button>

          {user ? (
            <>
              <Button component={Link} to="/upload" sx={navBtnStyle(darkMode)}>Upload</Button>
              <Button component={Link} to="/completed" sx={navBtnStyle(darkMode)}>Completed</Button>
              <Button onClick={handleLogout} sx={navBtnStyle(darkMode)}>Logout</Button>
            </>
          ) : (
            <Button component={Link} to="/login" sx={navBtnStyle(darkMode)}>Login</Button>
          )}

          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun color="#ffc107" /> : <Moon color="#333" />}
          </IconButton>
        </Box>
      </Toolbar>
    </MotionAppBar>
  );
}
