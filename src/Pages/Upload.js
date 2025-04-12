    import React, { useState } from "react";
    import { Box, Button, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
    import { motion } from "framer-motion";
    import { useNavigate } from "react-router-dom";

    function Upload({ darkMode }) {
      const [file, setFile] = useState(null);
      const [uploading, setUploading] = useState(false);
      const [message, setMessage] = useState("");
      const [open, setOpen] = useState(false);
      const [dragging, setDragging] = useState(false);
      const navigate = useNavigate();

      const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };

      const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        if (event.dataTransfer.files.length > 0) {
          setFile(event.dataTransfer.files[0]);
        }
      };

      const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setMessage("");
        setOpen(false);

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
            method: "POST",
            body: formData,
            mode:"no-cors"
          });

          const data = await response.json();
          console.log("Backend Response:", data);


          if (response.ok && data.compressed_file) {
            const info = {
              name: file.name,
              originalSize: file.size,
              compressedSize: data.compressed_size,
              url: data.compressed_file,
            };

            const stored = JSON.parse(localStorage.getItem("compressedInfo")) || [];
            localStorage.setItem("compressedInfo", JSON.stringify([info, ...stored]));

            navigate("/completed");
          } else {
            setMessage(`Error: ${data.message || "Something went wrong"}`);
            setOpen(true);
          }
        } catch (error) {
          setMessage("Upload failed! Please try again.");
          setOpen(true);
        } finally {
          setUploading(false);
        }
      };

      return (
        <>
          <style>{"body { overflow: hidden; }"}</style>

          <Box sx={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -10, overflow: "hidden", background: "black" }}>
            <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
              <source src={`${process.env.PUBLIC_URL}/background.mp4`} type="video/mp4" />
            </video>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            sx={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", color: darkMode ? "white" : "black", textAlign: "center" }}
          >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <Typography variant="h4" gutterBottom sx={{ color: darkMode ? "white" : "black" }}>
                Upload and Compress Audio
              </Typography>
            </motion.div>

            <Box
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              sx={{
                width: "300px", height: "150px", border: "2px dashed", borderColor: dragging ? "blue" : darkMode ? "white" : "black",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px",
                backgroundColor: darkMode ? "#333" : "#f9f9f9", position: "relative"
              }}
            >
              <Typography sx={{ color: darkMode ? "white" : "black" }}>Drag & Drop or Click to Upload</Typography>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: darkMode ? "#ff4081" : "#ff9800", color: "white",
                '&:hover': { bgcolor: darkMode ? "#f50057" : "#f57c00" }
              }}
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? <CircularProgress size={24} /> : "Upload"}
            </Button>

            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
              <Alert onClose={() => setOpen(false)} severity={message.includes("Error") ? "error" : "success"}>
                {message}
              </Alert>
            </Snackbar>
          </Box>
        </>
      );
    }

    export default Upload;
