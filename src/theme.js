import { createTheme } from '@mui/material/styles';

export const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#42a5f5' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f4f4f4',
        paper: darkMode ? '#1e1e1e' : '#fff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#111111',
      },
    },
    typography: {
      fontFamily: "'Onlygraphic', sans-serif",
    },
  });
