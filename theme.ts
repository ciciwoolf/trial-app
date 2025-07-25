import { createTheme } from '@mui/material/styles';

const customColors = {
  richBlack: '#001011',      // --rich-black
  selectiveYellow: '#ffb60a', // --selective-yellow  
  iris: '#613dc1',           // --iris
  moonstone: '#009fb7',      // --moonstone
  russianViolet: '#20063b',  // --russian-violet
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
      main: customColors.iris,           // Purple as secondary
      light: '#8b6fd9',
      dark: '#4a2e97',
      contrastText: '#ffffff',
    },
    background: {
      default: customColors.richBlack,   // Deep black background
      paper: customColors.russianViolet, // Dark purple for cards
    },
    success: { main: customColors.moonstone }, // Teal for success
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
      color: customColors.iris,
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
          backgroundImage: `linear-gradient(45deg, ${customColors.iris} 30%, ${customColors.selectiveYellow} 90%)`,
          boxShadow: `0 3px 5px 2px rgba(255, 182, 10, .3)`,
          '&:hover': {
            backgroundImage: `linear-gradient(45deg, ${customColors.russianViolet} 30%, ${customColors.iris} 90%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(135deg, ${customColors.russianViolet} 0%, ${customColors.iris} 100%)`,
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
          backgroundImage: `linear-gradient(90deg, ${customColors.russianViolet} 0%, ${customColors.iris} 50%, ${customColors.russianViolet} 100%)`,
        },
      },
    },
  },
});