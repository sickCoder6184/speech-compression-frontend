// src/Pages/HeroSections/SectionOneHero.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SectionOneHero = ({ onScrollToFeatures, onScrollToLinks, onScrollToContact, darkMode }) => {
  return (
    <Box sx={{ position: "relative", height: "100vh", overflowX: "hidden" }}>
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src={`${process.env.PUBLIC_URL}/heroVide.mp4`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -10   ,
        }}
      />

      {/* ✨ Content */}
      <Box

        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,

          width: "100%",
          height: "100%",
          zIndex: 1,
          color: darkMode ? "#fff" : "#111",
          px: 4,
          mt:4,
          fontFamily: "'Onlygraphic', sans-serif",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: (theme) => darkMode ?  theme.palette.text.primary:theme.palette.common.white,
              }}
            >
              Welcome to Speech Compression
            </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: 910,
              mb: 4,
              color:(theme) =>  darkMode ?  "yellow" :"yellow",
            }}
          >
            Smartly reduce audio file sizes using LPC and DWT — preserving speech clarity while saving bandwidth.
          </Typography>

          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            color="primary"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 500,
              boxShadow: "0px 4px 15px rgba(33, 150, 243, 0.4)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 20px rgba(33, 150, 243, 0.6)",
              },
            }}
          >
            Get Started
          </Button>

          <Box mt={4} display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            {[
              { label: "Learn More", onClick: onScrollToFeatures },
              { label: "About", onClick: onScrollToLinks },
              { label: "Contact Us", onClick: onScrollToContact },
            ].map((item, idx) => (
              <Button
                key={idx}
                onClick={item.onClick}
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: "30px",
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "#90caf9",
                  border: "2px solid #90caf9",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 20px rgba(144, 202, 249, 0.6)",
                    borderColor: "#42a5f5",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </motion.div>

        {/* Footer Text */}
        <Typography
          variant="body2"
          sx={{ mt: 6, fontSize: "0.9rem", opacity: 0.7 }}
        >
          © 2025 Speech Compression. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default SectionOneHero;
