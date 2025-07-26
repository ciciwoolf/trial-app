import { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Fade,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Close, RocketLaunch } from '@mui/icons-material';
import FallingStars from './FallingStars';
import { RoverPhotosTable } from './RoverPhotosTable';
import { MissionPlanningForm } from './MissionPlanningForm';

export const HomePage = () => {
  const [showTable, setShowTable] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [animatedText, setAnimatedText] = useState('');

  const initializingText = 'Dashboard initializing...';

  // Typing animation effect
  useEffect(() => {
    if (!showTable) {
      let index = 0;
      const interval = setInterval(() => {
        setAnimatedText(initializingText.slice(0, index));
        index++;
        if (index > initializingText.length) {
          index = 0; // Reset for continuous loop
        }
      }, 150);

      return () => clearInterval(interval);
    }
  }, [showTable]);

  const handleStartExploring = () => {
    setShowTable(true);
    setTimeout(() => {
      document.getElementById('rover-table')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  };

  const handleResetTable = () => {
    setShowTable(false);
  };

  const handleOpenMissionPlanning = () => {
    setShowMissionModal(true);
  };

  const handleCloseMissionPlanning = () => {
    setShowMissionModal(false);
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
          NASA Data Explorer
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Real-time space data and mission analytics
        </Typography>

        <Card>
          <CardContent sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom color="primary">
              🚀 System Status: Online
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, minHeight: '24px' }}>
              {showTable ? (
                'Mars rover data loaded!'
              ) : (
                <Box component="span">
                  {animatedText}
                  <Box
                    component="span"
                    sx={{
                      animation: 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%, 50%': { opacity: 1 },
                        '51%, 100%': { opacity: 0 },
                      },
                      color: 'primary.main',
                      fontWeight: 'bold',
                    }}
                  >
                    |
                  </Box>
                </Box>
              )}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}
              spacing={2}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleStartExploring}
                disabled={showTable}
              >
                {showTable ? 'Exploring...' : 'Start Exploring'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleOpenMissionPlanning}
                startIcon={<RocketLaunch />}
              >
                Plan Mission
              </Button>
            </Stack>
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
            <RoverPhotosTable onReset={handleResetTable} />
          </Box>
        </Fade>
      )}

      {/* Mission Planning Modal */}
      <Dialog
        open={showMissionModal}
        onClose={handleCloseMissionPlanning}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">🛰️ Mission Planning</Typography>
            <IconButton onClick={handleCloseMissionPlanning} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <MissionPlanningForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
