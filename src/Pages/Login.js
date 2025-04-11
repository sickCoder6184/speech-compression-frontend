import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
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
    input: { color: darkMode ? "#fff" : "#000" },
    label: { color: darkMode ? "#bbb" : "#000" },
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
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ bgcolor: darkMode ? "#121212" : "#fff", color: darkMode ? "#fff" : "#000" }}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={message.includes("successful") ? "success" : "error"}>{message}</Alert>
      </Snackbar>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" gutterBottom>
          {isSignup ? "Create an Account" : "Login to Your Account"}
        </Typography>
      </motion.div>

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

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAuth}>
        {isSignup ? "Sign Up" : "Login"}
      </Button>

      <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleGoogleLogin}>
        Login with Google
      </Button>

      {!isSignup && (
        <Button color="error" sx={{ mt: 1 }} onClick={handleResetPassword}>
          Forgot Password?
        </Button>
      )}

      <Button color="info" sx={{ mt: 2 }} onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "New user? Sign up"}
      </Button>
    </Box>
  );
}

export default Login;
