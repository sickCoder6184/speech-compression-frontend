// src/Pages/HeroSections/SectionTwoFeatures.js
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";

const features = [
  {
    title: "What is Speech Compression?",
    icon: "🧩",
    description:
      "Speech compression reduces audio file size while preserving intelligibility. It's used in streaming, telephony, and storage-limited systems.",
  },
  {
    title: "LPC – Linear Predictive Coding",
    icon: "🧠",
    description:
      "LPC predicts the current speech sample using previous ones, effectively modeling the human vocal tract and reducing redundancy.",
  },
  {
    title: "DWT – Discrete Wavelet Transform",
    icon: "🌊",
    description:
      "DWT decomposes speech into time-frequency components, allowing smart removal of non-critical sound while preserving speech clarity.",
  },
  {
    title: "Why It's Efficient",
    icon: "⚡",
    description:
      "Combining LPC and DWT gives high compression with low distortion. It’s ideal for bandwidth-sensitive applications.",
  },
];

const SectionTwoFeatures = () => {
  return (
    <Box
      sx={{
        py: 10,
        px: 3,
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        color: "#fff",
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
        How It Works
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 4,
                  backdropFilter: "blur(16px)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <Typography fontSize="2rem">{feature.icon}</Typography>
                <Typography variant="h6" fontWeight="600" mb={1}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="#ccc">
                  {feature.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SectionTwoFeatures;
