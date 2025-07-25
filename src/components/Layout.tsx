import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Rocket } from '@mui/icons-material';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '100vw', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ textAlign: 'center', flexGrow: 1 }}>
            🛰️ NASA Data Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1,
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          py: 4
        }}
      >
        {children}
      </Container>
    </Box>
  );
};