import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Box,
  Typography,
  // Card,
  // CardContent,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Close,
  Download,
  Share,
  Favorite,
  FavoriteBorder,
  PhotoCamera,
  CalendarToday,
  Rocket,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import type { RoverPhoto } from '../types/nasa';

interface PhotoDetailModalProps {
  photo: RoverPhoto | null;
  open: boolean;
  onClose: () => void;
}

export const PhotoDetailModal = ({
  photo,
  open,
  onClose,
}: PhotoDetailModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoom, setZoom] = useState(1);

  if (!photo) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.img_src;
    link.download = `mars-photo-${photo.id}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Mars Photo - Sol ${photo.sol}`,
        text: `Mars photo from ${photo.rover.name} rover`,
        url: photo.img_src,
      });
    } else {
      navigator.clipboard.writeText(photo.img_src);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        '& .MuiPaper-root': {
          width: { xs: '95vw', sm: '90vw', md: '80vw' },
          height: { xs: '90vh', sm: '85vh', md: '80vh' },
          maxWidth: '100vw',
          maxHeight: '100vh',
          margin: 'auto',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // prevent modal overflow
        },
      }}
    >
      {/* Header with Close Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6">📸 Mars Photo - Sol {photo.sol}</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          p: 3,
          overflow: 'auto', // always allow scroll if needed, but not overflow
          maxWidth: '100%',
        }}
      >
        {/* LEFT BOX - Photo (50% on desktop, full width on mobile) */}
        <Box
          sx={{
            flex: { xs: '0 0 auto', md: '0 0 50%' },
            minHeight: { xs: '300px', md: 'auto' },
            position: 'relative',
            backgroundColor: 'black',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            maxWidth: '100%',
          }}
        >
          <img
            src={photo.img_src}
            alt={`Mars photo from ${photo.rover.name} rover`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s ease',
              cursor: zoom > 1 ? 'zoom-out' : 'zoom-in',
              display: 'block',
            }}
            onClick={() => setZoom(zoom > 1 ? 1 : 2)}
          />

          {/* Zoom Controls */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <IconButton
              onClick={() => setZoom((prev) => Math.min(prev + 0.5, 3))}
              sx={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}
              size="small"
            >
              <ZoomIn />
            </IconButton>
            <IconButton
              onClick={() => setZoom((prev) => Math.max(prev - 0.5, 0.5))}
              sx={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}
              size="small"
            >
              <ZoomOut />
            </IconButton>
          </Box>
        </Box>

        {/* RIGHT BOX - Three Sections Stacked */}
        <Box
          sx={{
            flex: { xs: '1', md: '0 0 50%' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minHeight: 0,
            maxWidth: '100%',
          }}
        >
          {[
            {
              title: '📷 Camera Details',
              titleColor: 'secondary',
              content: 'test',
            },
            {
              title: '📊 Photo Details',
              titleColor: 'primary',
              content: 'test',
            },
            {
              title: '🤖 Rover Information',
              titleColor: 'success.main',
              content: 'test',
            },
          ].map((section, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 1 0',
                backgroundColor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                p: 3,
                minWidth: 0,
                minHeight: 0,
                maxWidth: '100%',
                overflow: 'hidden',
                mr: 0, // remove right margin
              }}
            >
              <Typography variant="h6" gutterBottom color={section.titleColor}>
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color={section.titleColor}
              >
                {section.content}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer Actions */}
      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: '100%', justifyContent: 'space-between' }}
        >
          <Button
            startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
            onClick={() => setIsFavorite(!isFavorite)}
            color={isFavorite ? 'error' : 'inherit'}
            variant={isFavorite ? 'contained' : 'outlined'}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </Button>

          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Share />}
              onClick={handleShare}
              variant="outlined"
            >
              Share
            </Button>
            <Button
              startIcon={<Download />}
              onClick={handleDownload}
              variant="outlined"
            >
              Download
            </Button>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
