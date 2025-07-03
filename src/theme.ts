import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#23411C', // Deep Olive Green (header, buttons)
      contrastText: '#fff',
    },
    secondary: {
      main: '#A3C47C', // Light Olive Green (accents, highlights)
    },
    background: {
      default: '#F6F8F3', // Very light green/neutral background
      paper: '#FFFFFF',
    },
    warning: {
      main: '#FFB300', // Amber/Orange for warnings/insights
      contrastText: '#fff',
    },
    success: {
      main: '#6BA368', // Muted green for positive states
    },
    text: {
      primary: '#2D2D2D', // Dark neutral for text
      secondary: '#6B6B6B', // Muted for secondary text
    },
    divider: '#E0E0E0',
    info: {
      main: '#E6F4EA', // Very light green for info backgrounds
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.95rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme; 