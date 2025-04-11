// src/Pages/HeroSections/SectionThreeLinks.js
import React from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const links = [
  {
    title: "Upload Audio",
    description: "Compress your audio files using our intelligent speech compression engine.",
    path: "/upload",
    protected: true,
  },
  {
    title: "About This Project",
    description: "Learn how LPC and DWT are used to build powerful audio compression.",
    path: "/about",
  },
  {
    title: "Login / Signup",
    description: "Access your account to upload, track files, and manage settings.",
    path: "/login",
  },
];

const SectionThreeLinks = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleClick = (link) => {
    if (link.protected && !user) {
      navigate("/login");
    } else {
      navigate(link.path);
    }
  };

  return (
    <Box
      sx={{
        py: 20,
        px: { xs: 2, sm: 4, md: 8 },
        background: "linear-gradient(to top, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        overflowX: "hidden"
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={6}
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore the App
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {links.map((link, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backdropFilter: "blur(16px)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <Typography variant="h6" fontWeight="600" mb={1}>
                  {link.title}
                </Typography>
                <Typography variant="body2" color="#ccc" mb={3}>
                  {link.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(link)}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  Go
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SectionThreeLinks;
