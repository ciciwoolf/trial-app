import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Rocket } from '@mui/icons-material';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ minWidth: '100vw' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Rocket sx={{ mr: 2, fontSize: 30 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🛰️ NASA Data Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="xl"
        className="page-content"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 8, // Add top margin to prevent content from being hidden
        }}
      >
        {children}
      </Container>
    </Box>
  );
};
