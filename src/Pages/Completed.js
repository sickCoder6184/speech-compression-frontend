import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

function Completed() {
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("compressedInfo")) || [];
    const updated = stored.map(file => ({
      ...file,
      url: `https://speech-compression-backend.onrender.com/download/${file.url.split("/").pop()}`
    }));
    setFileData(updated);
  }, []);

  const formatSize = (size) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleDelete = (index) => {
    const updated = [...fileData];
    updated.splice(index, 1);
    localStorage.setItem("compressedInfo", JSON.stringify(updated));
    setFileData(updated);
  };

  const handleClearAll = () => {
    localStorage.removeItem("compressedInfo");
    setFileData([]);
  };

  if (fileData.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", color: "white" }}
      >
        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
          No compressed files found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      p={4}
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        background: "radial-gradient(circle at top left, #1f1c2c, #928dab)",
        color: "white",
      }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight={700} sx={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>
            Compressed Files
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
            sx={{ textTransform: "none" }}
          >
            Clear All
          </Button>
        </Stack>

        <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#3f51b5" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>File Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Original Size</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Compressed Size</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Download</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileData.map((file, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{file.name}</TableCell>
                  <TableCell>{formatSize(file.originalSize)}</TableCell>
                  <TableCell>{formatSize(file.compressedSize)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      href={file.url}
                      download
                      sx={{ textTransform: "none" }}
                    >
                      Download
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(index)}
                      sx={{ textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </Box>
  );
}

export default Completed;