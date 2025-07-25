import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Link,
} from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundImage:
          'linear-gradient(to bottom, #000811, #001122, #000d1a, #000508)',
      }}
    >
      <AppBar
        position="static"
        sx={{ zIndex: 1, backgroundColor: 'background.paper' }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: 'center', flexGrow: 1 }}
          >
            🛰️ NASA Data Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        {children}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          py: 2,
          mt: 'auto',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            Built by{' '}
            <Link
              href="https://linkedin.com/in/christinewoolf"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Christine Woolf
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
