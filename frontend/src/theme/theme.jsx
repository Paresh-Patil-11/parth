import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(137,108,108)',
    },
    secondary: {
      main: 'rgb(229,190,181)',
    },
    background: {
      default: 'rgb(245,250,225)',
      paper: '#ffffff',
    },
    custom: {
      cardBg: 'rgb(229,190,181)',
      borderColor: 'rgb(238,230,202)',
      tableHeader: 'rgb(137,108,108)',
      tableRowAlt: 'rgb(245,250,225)',
    },
  },
  typography: {
fontFamily: '"Georgia", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '3.1rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;