import {  
  Typography, 
  Button, 
  Card, 
  CardContent,
  Stack,
} from '@mui/material';
import { 
  Error,
  Refresh,
  SignalWifiOff,
  SentimentDissatisfied,
  Satellite,
} from '@mui/icons-material';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryable?: boolean;
  type?: 'network' | 'api' | 'not-found' | 'generic';
}

export const ErrorState = ({ 
  title, 
  message, 
  onRetry, 
  retryable = true,
  type = 'generic' 
}: ErrorStateProps) => {
  
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <SignalWifiOff sx={{ fontSize: 80, color: 'error.main' }} />,
          defaultTitle: 'NASA Connection Lost',
          defaultMessage: 'Unable to connect to NASA servers. Check your internet connection or try again later.',
        };
      case 'api':
        return {
          icon: <Satellite sx={{ fontSize: 80, color: 'warning.main' }} />,
          defaultTitle: 'NASA API Limit Reached',
          defaultMessage: 'Too many requests to NASA servers. Please wait a moment before trying again.',
        };
      case 'not-found':
        return {
          icon: <SentimentDissatisfied sx={{ fontSize: 80, color: 'info.main' }} />,
          defaultTitle: 'No Data Found',
          defaultMessage: 'No photos found for the selected filters. Try adjusting your search criteria.',
        };
      default:
        return {
          icon: <Error sx={{ fontSize: 80, color: 'error.main' }} />,
          defaultTitle: '⚠️ Something Went Wrong',
          defaultMessage: 'An unexpected error occurred. Please try again.',
        };
    }
  };

  const config = getErrorConfig();

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Stack spacing={3} alignItems="center" textAlign="center">
          {config.icon}
          
          <Typography variant="h5" color="error">
            {title || config.defaultTitle}
          </Typography>
          
          <Typography variant="body1" color="text.secondary">
            {message || config.defaultMessage}
          </Typography>
          
          {retryable && onRetry && (
            <Button 
              variant="contained" 
              startIcon={<Refresh />}
              onClick={onRetry}
              size="large"
            >
              Try Again
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

// Specialized error components for common cases
export const NetworkError = ({ onRetry }: { onRetry?: () => void }) => (
  <ErrorState type="network" onRetry={onRetry} />
);

export const APILimitError = ({ onRetry }: { onRetry?: () => void }) => (
  <ErrorState type="api" onRetry={onRetry} />
);

export const NoDataError = ({ onReset }: { onReset?: () => void }) => (
  <ErrorState 
    type="not-found" 
    onRetry={onReset}
    retryable={!!onReset}
  />
);