import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ darkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Signup successful! You can now log in.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful!");
        setOpen(true);
        setTimeout(() => navigate("/upload"), 1000);
      }
    } catch (error) {
      setMessage(error.message);
      setOpen(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setMessage("Google Login successful!");
      setOpen(true);
      setTimeout(() => navigate("/upload"), 1000);
    } catch (error) {
      setMessage(error.message);
      setOpen(true);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
      setOpen(true);
    } catch (error) {
      setMessage(error.message);
      setOpen(true);
    }
  };

  const textFieldStyles = {
    my: 1,
    width: "300px",
    input: { color: "#fff" },
    label: { color: "#fff" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: darkMode ? "#777" : "#ccc",
      },
      "&:hover fieldset": {
        borderColor: darkMode ? "#aaa" : "#888",
      },
      "&.Mui-focused fieldset": {
        borderColor: darkMode ? "#fff" : "#000",
      },
    },
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        position: "relative",
        px: 2,
        color: "#fff",
        transition: "background-color 0.5s ease",
        overflow: "hidden",
      }}
    >
      {/* Background Video with Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={darkMode ? "dark" : "light"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            zIndex: -2,
          }}
        >
          <video
            src={darkMode ? "/loginVideo.mp4" : "/dayLoginVideo.mp4"}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(8px) brightness(0.6)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={message.includes("successful") ? "success" : "error"}>{message}</Alert>
      </Snackbar>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        <Typography variant="h4" gutterBottom fontWeight={600} sx={{ color: "#fff" }}>
          {isSignup ? "Create an Account" : "Login to Your Account"}
        </Typography>
        <Typography variant="body1" sx={{ color: "#fff" }}>
          {isSignup ? "Start your journey with us" : "Welcome back! Log in to continue"}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={textFieldStyles}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={textFieldStyles}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: 300, fontWeight: 600, py: 1 }}
          onClick={handleAuth}
        >
          {isSignup ? "Sign Up" : "Login"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 2, width: 300, fontWeight: 500, py: 1 }}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>

        {!isSignup && (
          <Button color="error" sx={{ mt: 1 }} onClick={handleResetPassword}>
            Forgot Password?
          </Button>
        )}

        <Button
          color="info"
          sx={{ mt: 2, textTransform: "none" }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </Button>
      </motion.div>
    </Box>
  );
}

export default Login;