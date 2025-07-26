import { useState } from 'react';
import { ErrorState, NetworkError, APILimitError } from './ErrorState';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Avatar,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PhotoCamera,
  Visibility,
  SentimentDissatisfied,
  Home,
} from '@mui/icons-material';
import { useRoverPhotos } from '../hooks/useRoverPhotos';
import { LoadingSpinner } from './LoadingSpinner';
import { PhotoDetailModal } from './PhotoDetailModal';
import type { RoverPhoto, RoverPhotoFilters } from '../types/nasa';

// https://api.nasa.gov/ - Mars Rover Photos section
const ROVERS = [
  { value: 'curiosity', label: 'Curiosity', status: 'active' },
  { value: 'opportunity', label: 'Opportunity', status: 'complete' },
  { value: 'spirit', label: 'Spirit', status: 'complete' },
  { value: 'perseverance', label: 'Perseverance', status: 'active' },
];

const CAMERAS = [
  { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
  { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
  { value: 'MAST', label: 'Mast Camera' },
  { value: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
  { value: 'MAHLI', label: 'Mars Hand Lens Imager' },
  { value: 'NAVCAM', label: 'Navigation Camera' },
];

interface RoverPhotosTableProps {
  onReset?: () => void;
}

// Set default filters
export const RoverPhotosTable = ({ onReset }: RoverPhotosTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // xs (0-600px)
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // sm-md (600-900px)

  const [filters, setFilters] = useState<RoverPhotoFilters>({
    rover: 'curiosity',
    sol: 1000,
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [selectedPhoto, setSelectedPhoto] = useState<RoverPhoto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = useRoverPhotos(filters);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (field: keyof RoverPhotoFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }));
    setPaginationModel((prev) => ({ ...prev, page: 0 })); // Reset to first page
  };

  const handlePhotoView = (photo: RoverPhoto) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPhoto(null);
  };

  // Responsive columns based on screen size
  const getColumns = (): GridColDef[] => {
    const baseColumns: GridColDef[] = [
      {
        field: 'img_src',
        headerName: 'Image',
        width: isMobile ? 80 : 100,
        flex: isMobile ? 0 : undefined,
        sortable: false,
        renderCell: (params) => (
          <Avatar
            src={params.value}
            variant="rounded"
            sx={{
              width: isMobile ? 50 : 60,
              height: isMobile ? 50 : 60,
              cursor: 'pointer',
            }}
            onClick={() => handlePhotoView(params.row)}
          />
        ),
      },
      {
        field: 'sol',
        headerName: 'Sol Day',
        width: isTablet ? 100 : 120,
        flex: isTablet ? 1 : undefined,
        type: 'number',
        renderCell: (params) => (
          <Chip
            label={`Sol ${params.value}`}
            color="secondary"
            variant="outlined"
            size={isMobile ? 'small' : 'small'}
          />
        ),
      },
      {
        field: 'earth_date',
        headerName: isMobile ? 'Date' : 'Earth Date',
        width: isTablet ? 110 : 130,
        flex: isTablet ? 1 : undefined,
        valueFormatter: (value) => new Date(value).toLocaleDateString(),
      },
      {
        field: 'camera',
        headerName: 'Camera',
        width: isTablet ? 120 : 150,
        flex: isTablet ? 1 : undefined,
        valueGetter: (_: unknown, row) => row.camera.name,
        renderCell: (params) => (
          <Stack direction="row" spacing={1} alignItems="center">
            {!isMobile && <PhotoCamera fontSize="small" />}
            <Typography
              variant="body2"
              sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
            >
              {params.value}
            </Typography>
          </Stack>
        ),
      },
      {
        field: 'rover',
        headerName: 'Rover',
        width: isTablet ? 100 : 120,
        flex: isTablet ? 1 : undefined,
        valueGetter: (_: unknown, row) => row.rover.name,
        renderCell: (params) => {
          const rover = ROVERS.find(
            (r) => r.value === params.value.toLowerCase()
          );
          return (
            <Chip
              label={params.value}
              color={rover?.status === 'active' ? 'info' : 'default'}
              size="small"
            />
          );
        },
      },
    ];

    // Add desktop-only columns
    if (!isTablet) {
      baseColumns.splice(1, 0, {
        field: 'id',
        headerName: 'Photo ID',
        width: 100,
        type: 'number',
      });

      baseColumns.push({
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <Button
            startIcon={<Visibility />}
            size="small"
            onClick={() => handlePhotoView(params.row)}
          >
            View
          </Button>
        ),
      });
    } else {
      // On mobile/tablet, add a compact view action
      baseColumns.push({
        field: 'actions',
        headerName: 'View',
        width: 80,
        sortable: false,
        renderCell: (params) => (
          <IconButton
            size="small"
            onClick={() => handlePhotoView(params.row)}
            sx={{
              padding: '4px',
            }}
          >
            <Visibility />
          </IconButton>
        ),
      });
    }

    return baseColumns;
  };

  const columns = getColumns();

  // Handle errors
  if (error) {
    // Check error type and show appropriate error
    const errorMessage = error.message.toLowerCase();

    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      return <APILimitError onRetry={() => refetch()} />;
    }

    if (errorMessage.includes('network') || errorMessage.includes('timeout')) {
      return <NetworkError onRetry={() => refetch()} />;
    }

    // Generic error fallback
    return (
      <ErrorState
        title="NASA Data Error"
        message="Unable to load rover photos. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
            spacing={{ xs: 2, sm: 0 }}
            sx={{ mb: 2 }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            >
              🛰️ Mars Rover Photo Explorer
            </Typography>
            <Button
              variant="contained"
              onClick={onReset}
              startIcon={<Home />}
              size="small"
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Return to Dashboard
            </Button>
          </Stack>

          {/* Filters */}
          <Box sx={{ mb: 3 }}>
            <Stack
              direction={{ xs: 'column', sm: 'column', md: 'row' }}
              spacing={2}
              flexWrap="wrap"
              useFlexGap
            >
              <FormControl
                sx={{
                  minWidth: { xs: '100%', sm: 200, md: 200 },
                  flex: { md: 1 },
                }}
              >
                <InputLabel>Rover</InputLabel>
                <Select
                  value={filters.rover}
                  label="Rover"
                  onChange={(e) => handleFilterChange('rover', e.target.value)}
                  size={isMobile ? 'medium' : 'medium'}
                >
                  {ROVERS.map((rover) => (
                    <MenuItem key={rover.value} value={rover.value}>
                      {rover.label} ({rover.status})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  minWidth: { xs: '100%', sm: 200, md: 200 },
                  flex: { md: 1 },
                }}
              >
                <InputLabel>Camera</InputLabel>
                <Select
                  value={filters.camera || ''}
                  label="Camera"
                  onChange={(e) => handleFilterChange('camera', e.target.value)}
                  size={isMobile ? 'medium' : 'medium'}
                >
                  <MenuItem value="">All Cameras</MenuItem>
                  {CAMERAS.map((camera) => (
                    <MenuItem key={camera.value} value={camera.value}>
                      {isMobile
                        ? camera.value
                        : `${camera.value} - ${camera.label}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Sol Day"
                type="number"
                value={filters.sol || ''}
                onChange={(e) =>
                  handleFilterChange(
                    'sol',
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                sx={{
                  minWidth: { xs: '100%', sm: 150, md: 150 },
                  flex: { md: 1 },
                }}
                helperText={isMobile ? 'Mars day' : 'Martian day number'}
                size={isMobile ? 'medium' : 'medium'}
              />

              <TextField
                label="Earth Date"
                type="date"
                value={filters.earth_date || ''}
                onChange={(e) =>
                  handleFilterChange('earth_date', e.target.value)
                }
                sx={{
                  minWidth: { xs: '100%', sm: 180, md: 180 },
                  flex: { md: 1 },
                }}
                InputLabelProps={{ shrink: true }}
                size={isMobile ? 'medium' : 'medium'}
              />

              <Button
                variant="outlined"
                onClick={() => {
                  setFilters({ rover: 'curiosity', sol: 1000 });
                  setPaginationModel({ page: 0, pageSize: 10 });
                }}
                sx={{
                  minWidth: { xs: '100%', sm: 'auto' },
                  height: { xs: 56, sm: 56 }, // Match input height
                }}
                size={isMobile ? 'large' : 'medium'}
              >
                Reset Filters
              </Button>
            </Stack>
          </Box>

          {/* Data Grid */}
          <Box
            sx={{
              height: { xs: 500, sm: 550, md: 600 },
              maxHeight: '80vh',
              overflowY: 'auto',
              overflowX: { xs: 'auto', sm: 'auto', md: 'hidden' }, // Only enable horizontal scroll on mobile/tablet
              // Better touch scrolling on mobile
              WebkitOverflowScrolling: 'touch',
              // Custom scrollbar styling using theme
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                height: '8px',
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: (theme) => theme.palette.primary.main + '99', // 60% opacity
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.main + 'CC', // 80% opacity
                },
              },
            }}
          >
            {isLoading ? (
              <LoadingSpinner message="Loading Mars rover photos..." />
            ) : !data || data.photos.length === 0 ? (
              // Empty State
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                }}
              >
                <SentimentDissatisfied
                  sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }}
                />
                <Typography variant="h5" gutterBottom color="text.secondary">
                  No Mars Photos Found
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  No photos available for {filters.rover} rover
                  {filters.sol && ` on Sol ${filters.sol}`}
                  {filters.earth_date && ` on ${filters.earth_date}`}
                  {filters.camera && ` with ${filters.camera} camera`}.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setFilters({ rover: 'curiosity', sol: 1000 });
                    setPaginationModel({ page: 0, pageSize: 10 });
                  }}
                >
                  Reset to Default
                </Button>
              </Box>
            ) : (
              // Data Grid with photos
              <DataGrid
                rows={data.photos}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
                rowHeight={isMobile ? 70 : isTablet ? 65 : 60}
                sx={{
                  // Force minimum width on mobile to enable horizontal scrolling
                  minWidth: { xs: '650px', sm: '700px', md: 'auto' },
                  width: { xs: '650px', sm: '700px', md: '100%' },
                  '& .MuiDataGrid-main': {
                    minWidth: { xs: '650px', sm: '700px', md: 'auto' },
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  },
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none',
                  },
                  '& .MuiDataGrid-cell': {
                    padding: isMobile ? '8px 4px' : '8px',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    fontWeight: 600,
                  },
                  // Better touch targets on mobile/tablet
                  '& .MuiDataGrid-row': {
                    cursor: isTablet && !isMobile ? 'pointer' : 'default',
                  },
                  // Enhanced touch scrolling
                  '& .MuiDataGrid-virtualScroller': {
                    // Enable smooth touch scrolling
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth',
                    // Show scrollbars on mobile for better UX
                    scrollbarWidth: isMobile ? 'thin' : 'auto',
                    '&::-webkit-scrollbar': {
                      height: isMobile ? '6px' : '8px',
                      width: isMobile ? '6px' : '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: (theme) =>
                        theme.palette.primary.main + '99', // 60% opacity
                      borderRadius: '3px',
                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.palette.primary.main + 'CC', // 80% opacity
                      },
                    },
                  },
                  // Touch-friendly column resizing
                  '& .MuiDataGrid-columnSeparator': {
                    display: isMobile ? 'none' : 'block',
                  },
                }}
                onRowClick={
                  isTablet && !isMobile
                    ? (params) => handlePhotoView(params.row)
                    : undefined
                }
              />
            )}
          </Box>

          {/* Results Info - Only show when we have data */}
          {data && data.photos.length > 0 && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Showing {data.photos.length} photos from {filters.rover} rover
                {filters.sol && ` on Sol ${filters.sol}`}
                {filters.earth_date && ` on ${filters.earth_date}`}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
      <PhotoDetailModal
        photo={selectedPhoto}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
