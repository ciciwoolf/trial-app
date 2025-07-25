import { useState } from 'react';
import { Typography, Card, CardContent, Button, Box, Fade } from '@mui/material';
import FallingStars from './FallingStars';
import { RoverPhotosTable } from './RoverPhotosTable';

export const HomePage = () => {
  const [showTable, setShowTable] = useState(false);

  const handleStartExploring = () => {
    setShowTable(true);
    setTimeout(() => {
      document.getElementById('rover-table')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <>
      <FallingStars />
      
      {/* Welcome Section */}
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          position: 'relative',
          zIndex: 1,
          mb: showTable ? 6 : 0,
        }}
      >
        <Typography variant="h3" gutterBottom>
          🛰️ NASA Data Explorer
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Real-time space data and mission analytics
        </Typography>

        <Card>
          <CardContent sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom color="primary">
              🚀 System Status: Online
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {showTable ? 'Mars rover data loaded!' : 'Dashboard initializing...'}
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={handleStartExploring}
              disabled={showTable}
            >
              {showTable ? 'Exploring...' : 'Start Exploring'}
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Rover Photos Table */}
      {showTable && (
        <Fade in={showTable} timeout={1000}>
          <Box 
            id="rover-table"
            sx={{ 
              width: '100%', 
              maxWidth: '1200px',
              mt: 4,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <RoverPhotosTable />
          </Box>
        </Fade>
      )}
    </>
  );
};