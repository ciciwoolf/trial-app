import { Box, CircularProgress, Typography } from '@mui/material';
import { Rocket } from '@mui/icons-material';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = "Loading NASA data..." }: LoadingSpinnerProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      gap: 3,
    }}
  >
    <Box sx={{ position: 'relative' }}>
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{ color: 'primary.main' }}
      />
      <Rocket 
        sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 24,
          color: 'primary.main',
        }} 
      />
    </Box>
    
    <Typography variant="h6" color="primary">
      {message}
    </Typography>
    
    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
      Connecting to NASA servers...
    </Typography>
  </Box>
);