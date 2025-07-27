import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Close,
  Download,
  Share,
  ZoomIn,
  ZoomOut,
  BrokenImage,
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
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  // Reset states when photo changes
  useEffect(() => {
    if (photo) {
      setImageError(false);
      setImageLoading(true);
      setZoom(1);
    }
  }, [photo]);

  if (!photo) return null;

  // Reset image states when photo changes
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleDownload = () => {
    if (imageError) {
      // If image failed to load, copy the URL instead
      navigator.clipboard.writeText(photo.img_src);
      return;
    }

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
          width: { xs: '100vw', sm: '90vw', md: '80vw' },
          height: { xs: '90vh', sm: '85vh', md: '80vh' },
          maxWidth: '100vw',
          maxHeight: '100vh',
          margin: 'auto',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          overflowY: { xs: 'auto', md: 'hidden' }, // scroll entire modal on mobile
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
          overflow: { xs: 'visible', md: 'hidden' }, // remove inner scroll on mobile
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        {/* LEFT BOX - Photo (50% on desktop, full width on mobile) */}
        <Box
          sx={{
            flex: { xs: '0 0 auto', md: '0 0 50%' },
            minHeight: { xs: '200px', md: 'auto' },
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
          {imageError ? (
            // Fallback UI for broken images
            <Box
              sx={{
                width: '100%',
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.900',
                color: 'grey.400',
                borderRadius: 1,
              }}
            >
              <BrokenImage sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Image Not Available
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', px: 2 }}>
                The Mars photo could not be loaded. This may be due to a
                temporary NASA server issue.
              </Typography>
            </Box>
          ) : (
            <>
              {imageLoading && (
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.900',
                    color: 'grey.400',
                  }}
                >
                  <Typography>Loading image...</Typography>
                </Box>
              )}
              <img
                src={photo.img_src}
                alt={`Mars photo from ${photo.rover.name} rover`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                  width: '100%',
                  height: '350px',
                  maxWidth: '100%',
                  maxHeight: '350px',
                  objectFit: 'contain',
                  background: 'black',
                  transform: `scale(${zoom})`,
                  transition: 'transform 0.3s ease',
                  cursor: zoom > 1 ? 'zoom-out' : 'zoom-in',
                  display: imageLoading ? 'none' : 'block',
                }}
                onClick={() => setZoom(zoom > 1 ? 1 : 2)}
              />

              {/* Zoom Controls - only show when image is loaded */}
              {!imageLoading && (
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
              )}
            </>
          )}
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
              title: 'Camera Details',
              titleColor: 'secondary',
              content1: `Name: ${photo.camera?.name} (${photo.camera?.name})`,
              content2: `Rover ID: ${photo.camera?.rover_id}`,
            },
            {
              title: 'Photo Details',
              titleColor: 'primary',
              content1: `Sol Day: ${photo.sol}`,
              content2: `Earth Day: ${photo.earth_date}`,
            },
            {
              title: 'Rover Information',
              titleColor: 'success',
              content1: `Name: ${photo.rover?.name}`,
              content2: `Landing Date: ${photo.rover?.landing_date}`,
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
                minHeight: '150px',
                maxWidth: '100%',
                overflow: 'hidden',
                mr: { xs: 0, md: 2 },
              }}
            >
              <Typography variant="h6" gutterBottom color={section.titleColor}>
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color={section.titleColor}
                sx={{ fontSize: { xs: '12px', sm: '16px' } }}
              >
                {section.content1}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color={section.titleColor}
                sx={{ fontSize: { xs: '12px', sm: '16px' } }}
              >
                {section.content2}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer Actions */}
      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: { xs: 'stretch', sm: 'center' },
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              alignItems: { xs: 'stretch', sm: 'center' },
            }}
          >
            <Button
              startIcon={<Share />}
              onClick={handleShare}
              variant="outlined"
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Share
            </Button>
            <Button
              startIcon={<Download />}
              onClick={handleDownload}
              variant="outlined"
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              {imageError ? 'Copy URL' : 'Download'}
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
