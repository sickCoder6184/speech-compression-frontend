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

function Completed() {
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("compressedInfo")) || [];
    setFileData(stored);
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
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">No compressed files found.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4} sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Compressed Files</Typography>
        <Button variant="outlined" color="error" onClick={handleClearAll}>
          Clear All
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>File Name</strong></TableCell>
              <TableCell><strong>Original Size</strong></TableCell>
              <TableCell><strong>Compressed Size</strong></TableCell>
              <TableCell><strong>Download</strong></TableCell>
              <TableCell><strong>Delete</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileData.map((file, index) => (
              <TableRow key={index} hover>
                <TableCell>{file.name}</TableCell>
                <TableCell>{formatSize(file.originalSize)}</TableCell>
                <TableCell>{formatSize(file.compressedSize)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
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
    </Box>
  );
}

export default Completed;
