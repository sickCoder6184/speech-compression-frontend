// src/Pages/About.js
import React from "react";
import { Box, Typography, Grid, Paper, Avatar, Divider, Link } from "@mui/material";
import { motion } from "framer-motion";
import { GitHub } from "@mui/icons-material";

const techStack = [
  { name: "LPC", description: "Linear Predictive Coding models human speech patterns to reduce redundancy.", icon: "🧠" },
  { name: "DWT", description: "Discrete Wavelet Transform compresses sound by removing redundant frequencies.", icon: "🌊" },
  { name: "React", description: "Frontend framework used to build interactive UI.", icon: "⚛️" },
  { name: "Firebase", description: "Used for authentication and file storage.", icon: "🔥" },
];

const About = () => {
  return (
    <Box sx={{ py: 10, px: 4, maxWidth: "1000px", mx: "auto" }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
          About the Project
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          A next-generation speech compression system that reduces audio size without losing clarity — built for speed, intelligence, and accessibility.
        </Typography>

        <Typography variant="h5" fontWeight="bold" color="#90caf9" mt={6} gutterBottom>
          Why It Matters
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Designed to help users compress speech files efficiently, this system is ideal for low-bandwidth environments and storage-sensitive apps. Whether you're recording voice notes, logs, or building real-time voice apps — intelligibility is never compromised.
        </Typography>

        <Typography variant="h5" fontWeight="bold" color="#90caf9" mb={2}>
          Technologies Used
        </Typography>
        <Grid container spacing={3}>
          {techStack.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  backdropFilter: "blur(12px)",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "0.3s",
                  '&:hover': {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 30px rgba(66, 165, 245, 0.3)",
                  },
                }}
              >
                <Typography fontSize="2.2rem">{tech.icon}</Typography>
                <Typography variant="h6" fontWeight="600" color="#64ffda" mb={1}>{tech.name}</Typography>
                <Typography variant="body2" color="text.secondary">{tech.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" fontWeight="bold" color="#90caf9" mt={6} gutterBottom>
          How It Works
        </Typography>
        <ol style={{ color: "#ccc", paddingLeft: "1.5rem", lineHeight: 1.8, fontSize: "1rem" }}>
          <li>Upload a speech file (.flac)</li>
          <li>Audio is processed using LPC and DWT</li>
          <li>Compressed audio is reconstructed and previewed</li>
          <li>Download or save the output</li>
        </ol>

        <Divider sx={{ my: 6, borderColor: "#90caf9" }} />

        <Typography variant="h5" fontWeight="bold" color="#90caf9" gutterBottom>
          About the Creator
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 60, height: 60, bgcolor: "primary.main" }}>P</Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: "#64ffda" }}>Preyanshu</Typography>
            <Typography variant="body2" color="text.secondary">
              Frontend & Signal Processing Developer
            </Typography>
            <Link
              href="https://github.com/sickcoder6184"
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{
                color: "#90caf9",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
                '&:hover': { color: "#42a5f5" },
              }}
            >
              <GitHub fontSize="small" /> github.com/sickcoder6184
            </Link>
            <Typography variant="body2" mt={1}>Email: preyanshudhapola6184@gmail.com</Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default About;