import { createTheme } from '@mui/material/styles';

const customColors = {
  richBlack: '#000811',
  white: '#FFFFFF',
  deepOrange: '#FF6B35',
  brightBlue: '#00B4D8',
  darkBlue: '#011F5B',
  charcoal: '#2D3748',
  // Background gradient colors
  spaceGradient1: '#001122',
  spaceGradient2: '#04192e',
  spaceGradient3: '#000508',
  // Card gradient colors
  cardGradient1: '#011c57',
  cardGradient2: '#011a54',
  cardGradient3: '#001750',
  cardGradient4: '#00154d',
};

// Gradient helper functions
const gradients = {
  spaceBackground: `linear-gradient(to bottom, ${customColors.richBlack}, ${customColors.spaceGradient1}, ${customColors.spaceGradient2}, ${customColors.spaceGradient3})`,
  cardBackground: `linear-gradient(to right top, ${customColors.darkBlue}, ${customColors.cardGradient1}, ${customColors.cardGradient2}, ${customColors.cardGradient3}, ${customColors.cardGradient4})`,
};

export const customTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: customColors.white,
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
      main: '#00B4D8',
      contrastText: customColors.white,
    },
    warning: {
      main: customColors.white,
      contrastText: customColors.richBlack,
    },
    error: {
      main: '#EF4444',
      contrastText: customColors.white,
    },
    info: {
      main: customColors.brightBlue,
      contrastText: customColors.white,
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto Mono", monospace',
    h1: {
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: customColors.white,
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0.01em',
      color: customColors.white,
    },
    h6: {
      fontWeight: 600,
      color: customColors.white,
    },
    body1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      color: customColors.white,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: customColors.deepOrange,
          color: customColors.white,
          border: `1px solid ${customColors.white}`,
          '&:hover': {
            backgroundColor: customColors.white,
            color: customColors.richBlack,
            border: `1px solid ${customColors.deepOrange}`,
          },
        },
        outlined: {
          backgroundColor: customColors.brightBlue,
          color: customColors.white,
          border: `1px solid ${customColors.white}`,
          '&:hover': {
            backgroundColor: customColors.white,
            color: customColors.richBlack,
            border: `1px solid ${customColors.deepOrange}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: gradients.cardBackground,
          border: `1px solid ${customColors.deepOrange}`,
          color: customColors.white,
          '&:hover': {
            border: `1px solid ${customColors.white}`,
            boxShadow: `0 4px 20px ${customColors.deepOrange}40`, // Using hex with 40 = ~25% opacity
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: gradients.cardBackground,
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
            color: customColors.white,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--color-rich-black': customColors.richBlack,
          '--color-white': customColors.white,
          '--gradient-space-background': gradients.spaceBackground,
        },
      },
    },
  },
});

export { customColors, gradients };
