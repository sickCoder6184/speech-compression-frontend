// src/Pages/HeroSections/SectionFourContact.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const SectionFourContact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [snack, setSnack] = useState({ open: false, success: true, text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setSnack({ open: true, success: false, text: "All fields are required." });
      return;
    }

    emailjs
      .send(
        "service_fvzd5tb",
        "template_5vgbd8c",
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: "User Feedback",
        },
        "kjtARSnYBlU9BSppY"
      )
      .then(() => {
        setSnack({ open: true, success: true, text: "Feedback sent. Thank you!" });
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
          console.error("EmailJS Error:", error);
          setSnack({
            open: true,
            success: false,
            text: "Something went wrong. Please try again.",
          });
});

  };

  return (
    <Box
      sx={{
        py: 25,
        px: 3,
        background: "#121212",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </Typography>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        maxWidth={500}
        mx="auto"
        px={2}
      >
        <TextField
          label="Name"
          name="name"
          fullWidth
          variant="outlined"
          margin="normal"
          value={form.name}
          onChange={handleChange}
          sx={{
            input: { color: "#fff" },
            label: { color: "#bbb" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={form.email}
          onChange={handleChange}
          sx={{
            input: { color: "#fff" },
            label: { color: "#bbb" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />
        <TextField
          label="Your Message"
          name="message"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          margin="normal"
          value={form.message}
          onChange={handleChange}
          sx={{
            textarea: { color: "#fff" },
            label: { color: "#bbb" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, px: 5, textTransform: "none" }}
          onClick={handleSubmit}
        >
          Send Message
        </Button>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.success ? "success" : "error"}
        >
          {snack.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SectionFourContact;
