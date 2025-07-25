import { createTheme } from '@mui/material/styles';

const customColors = {
  richBlack: '#001011',      // --rich-black
  selectiveYellow: '#FFF275', // --selective-yellow  
  orange: '#FF8C42',           // --orange
  moonstone: '#009fb7',      // --moonstone
  orangeRed: '#FF3C38',  // --orangeRed
};

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: customColors.selectiveYellow, // Bright yellow as primary
      light: '#ffca42',
      dark: '#cc9108',
      contrastText: customColors.richBlack,
    },
    secondary: {
      main: customColors.orange,
      light: '#8b6fd9',
      dark: '#4a2e97',
      contrastText: '#ffffff',
    },
    background: {
      default: customColors.richBlack,
      paper: customColors.orangeRed,
    },
    success: { main: customColors.moonstone },
    warning: { main: customColors.selectiveYellow },
    error: { main: '#ff4444' },
    info: { main: customColors.moonstone },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto Mono", monospace',
    h1: { 
      fontWeight: 700, 
      letterSpacing: '0.02em',
      color: customColors.selectiveYellow,
    },
    h2: { 
      fontWeight: 600, 
      letterSpacing: '0.01em',
      color: customColors.orange,
    },
    h6: {
      fontWeight: 600,
      color: customColors.selectiveYellow,
    },
    body1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundImage: `linear-gradient(45deg, ${customColors.orange} 30%, ${customColors.selectiveYellow} 90%)`,
          boxShadow: `0 3px 5px 2px rgba(255, 182, 10, .3)`,
          '&:hover': {
            backgroundImage: `linear-gradient(45deg, ${customColors.orangeRed} 30%, ${customColors.orange} 90%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(135deg, ${customColors.orangeRed} 0%, ${customColors.orange} 100%)`,
          border: `1px solid rgba(255, 182, 10, 0.3)`,
          '&:hover': {
            border: `1px solid rgba(255, 182, 10, 0.6)`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(90deg, ${customColors.orangeRed} 0%, ${customColors.orange} 50%, ${customColors.orangeRed} 100%)`,
        },
      },
    },
  },
});