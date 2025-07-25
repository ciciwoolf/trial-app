import { createTheme } from '@mui/material/styles';

const customColors = {
  richBlack: '#000811',
  brightYellow: '#FFD700', // Gold
  deepOrange: '#FF6B35', // Darker orange
  brightBlue: '#00B4D8', // lighter blue 
  darkBlue: '#011F5B', // Blue for card backgrounds
  charcoal: '#2D3748', // Medium dark for secondary backgrounds
};

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: customColors.brightYellow,
      light: '#FFED4E',
      dark: '#B8860B',
      contrastText: customColors.richBlack,
    },
    secondary: {
      main: customColors.deepOrange,
      light: '#FF8A50',
      dark: '#E55100',
      contrastText: '#FFFFFF',
    },
    background: {
      default: customColors.richBlack,
      paper: customColors.darkBlue,
    },
    success: {
      main: '#10B981',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: customColors.brightYellow,
      contrastText: customColors.richBlack,
    },
    error: {
      main: '#EF4444',
      contrastText: '#FFFFFF',
    },
    info: {
      main: customColors.brightBlue,
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto Mono", monospace',
    h1: {
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: customColors.brightYellow,
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0.01em',
      color: '#FFFFFF',
    },
    h6: {
      fontWeight: 600,
      color: customColors.brightYellow,
    },
    body1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      color: '#F7FAFC',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: customColors.deepOrange,
          color: '#FFFFFF',
          border: `2px solid ${customColors.brightYellow}`,
          '&:hover': {
            backgroundColor: customColors.brightYellow,
            color: customColors.richBlack,
            border: `2px solid ${customColors.deepOrange}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: customColors.darkBlue,
          border: `1px solid ${customColors.deepOrange}`,
          color: '#FFFFFF',
          '&:hover': {
            border: `1px solid ${customColors.brightYellow}`,
            boxShadow: `0 4px 20px rgba(255, 215, 0, 0.3)`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: customColors.charcoal,
          borderBottom: `2px solid ${customColors.deepOrange}`,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-h5': {
            color: customColors.brightYellow,
          },
        },
      },
    },
  },
});
