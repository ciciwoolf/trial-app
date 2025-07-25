import { Typography, Card, CardContent, Button, Box } from '@mui/material';
import FallingStars from './FallingStars';

export const HomePage = () => {
  return (
    <>
      <FallingStars />
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography variant="h3" sx={{ textAlign: 'center' }} gutterBottom>
          NASA Data Explorer
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Real-time space data and mission analytics
        </Typography>

        <Card>
          <CardContent sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom color="primary">
              System Status: Online
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Dashboard initializing...
            </Typography>
            <Button variant="contained" size="large">
              Start Exploring
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
