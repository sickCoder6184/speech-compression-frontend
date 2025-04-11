import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Typography, Button } from "@mui/material";
import { getTheme } from "./theme";
import Upload from "./Pages/Upload";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Completed from "./Pages/Completed";
import Hero from "./Pages/Hero";
import Navbar from "./Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import WaveSurfer from "wavesurfer.js";

function App() {
  const [navHoverZone, setNavHoverZone] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const storedPref = localStorage.getItem("darkMode");
    return storedPref ? JSON.parse(storedPref) : true;
  });

  const theme = getTheme(darkMode);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        {/* Navbar hover zone */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1300,
          }}
          onMouseEnter={() => setNavHoverZone(true)}
          onMouseLeave={() => setNavHoverZone(false)}
        >
          <Box sx={{ height: "60px", pointerEvents: "auto" }} />
          <Navbar
            user={user}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            handleLogout={handleLogout}
            navVisible={navHoverZone}
          />
        </Box>

        <Box mt={0} sx={{ height: "100vh", overflowX: "hidden" }}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="/upload" /> : <Navigate to="/hero" />
                }
              />
              <Route
                path="/hero"
                element={
                  <AnimatedPage key="hero">
                    <Hero darkMode={darkMode} />
                  </AnimatedPage>
                }
              />
              <Route
                path="/home"
                element={
                  <AnimatedPage key="home">
                    <Home darkMode={darkMode} />
                  </AnimatedPage>
                }
              />
              <Route
                path="/about"
                element={
                  <AnimatedPage key="about">
                    <About darkMode={darkMode} />
                  </AnimatedPage>
                }
              />
              <Route
                path="/login"
                element={
                  <AnimatedPage key="login">
                    <Login darkMode={darkMode} />
                  </AnimatedPage>
                }
              />
              <Route
                path="/upload"
                element={
                  user ? (
                    <AnimatedPage key="upload">
                      <Upload darkMode={darkMode} />
                    </AnimatedPage>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/completed"
                element={
                  user ? (
                    <AnimatedPage key="completed">
                      <Completed />
                    </AnimatedPage>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </AnimatePresence>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// Animated wrapper for transitions
function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      style={{ height: "100vh", overflowX: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

// Home (waveform demo)
function Home({ darkMode }) {
  const waveformRef = useRef(null);
  const waveformInstance = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (waveformRef.current && !waveformInstance.current) {
        waveformInstance.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "#90caf9",
          progressColor: "#42a5f5",
          barWidth: 3,
          height: 100,
          responsive: true,
        });
        waveformInstance.current.load("/sample-audio.mp3");
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (waveformInstance.current?.destroy) {
        try {
          waveformInstance.current.destroy();
          waveformInstance.current = null;
        } catch (err) {
          console.warn("WaveSurfer cleanup failed:", err);
        }
      }
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        textAlign: "center",
        overflowX: "hidden",
        bgcolor: darkMode ? "#000" : "#f9f9f9",
        px: 2,
        backgroundImage: darkMode
          ? "url('/backgrounds/soundwave-dark.svg'), radial-gradient(ellipse at top left, #1a1a1a, #000)"
          : "url('/backgrounds/soundwave-light.svg'), radial-gradient(circle at top left, #fff, #e0e0e0)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: darkMode ? "#fff" : "#111",
            fontWeight: 700,
            mb: 2,
            letterSpacing: 1,
            textShadow: darkMode ? "0 0 15px rgba(66, 165, 245, 0.6)" : "none",
          }}
        >
          Welcome to Speech Compression
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: darkMode ? "#ccc" : "#333",
            mb: 4,
            maxWidth: 600,
            mx: "auto",
            textShadow: darkMode ? "0 0 10px rgba(255, 255, 255, 0.1)" : "none",
          }}
        >
          Efficiently compress and optimize speech files for bandwidth-limited applications.
        </Typography>
        <Box ref={waveformRef} sx={{ width: "80%", maxWidth: 800, mb: 4 }} />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/upload"
          sx={{
            px: 5,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "0px 4px 15px rgba(33, 150, 243, 0.4)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 20px rgba(33, 150, 243, 0.6)",
            },
          }}
        >
          Get Started
        </Button>
      </motion.div>
    </Box>
  );
}

export default App;
