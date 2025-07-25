import { useState } from 'react';
import {DataGrid } from '@mui/x-data-grid';
import type {
  GridColDef,
  GridPaginationModel,
} from '@mui/x-data-grid';
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
  Avatar,
  Chip,
  Stack,
  Alert,
} from '@mui/material';
import { PhotoCamera, Visibility, Refresh } from '@mui/icons-material';
import { useRoverPhotos } from '../hooks/useRoverPhotos';
import { LoadingSpinner } from './LoadingSpinner';
import type { RoverPhoto, RoverPhotoFilters } from '../types/nasa';

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
  onPhotoView?: (photo: RoverPhoto) => void;
}

export const RoverPhotosTable = ({ onPhotoView }: RoverPhotosTableProps) => {
  const [filters, setFilters] = useState<RoverPhotoFilters>({
    rover: 'curiosity',
    sol: 1000, // Start with Sol 1000 - good photos available
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  const { data, isLoading, error, refetch } = useRoverPhotos(filters);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (field: keyof RoverPhotoFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }));
    setPaginationModel((prev) => ({ ...prev, page: 0 })); // Reset to first page
  };

  const columns: GridColDef[] = [
    {
      field: 'img_src',
      headerName: 'Image',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          variant="rounded"
          sx={{ width: 60, height: 60, cursor: 'pointer' }}
          onClick={() => onPhotoView?.(params.row)}
        />
      ),
    },
    {
      field: 'id',
      headerName: 'Photo ID',
      width: 100,
      type: 'number',
    },
    {
      field: 'sol',
      headerName: 'Sol Day',
      width: 120,
      type: 'number',
      renderCell: (params) => (
        <Chip
          label={`Sol ${params.value}`}
          color="primary"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'earth_date',
      headerName: 'Earth Date',
      width: 130,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    {
      field: 'camera',
      headerName: 'Camera',
      width: 150,
      valueGetter: (value, row) => row.camera.name,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <PhotoCamera fontSize="small" />
          <Typography variant="body2">{params.value}</Typography>
        </Stack>
      ),
    },
    {
      field: 'rover',
      headerName: 'Rover',
      width: 120,
      valueGetter: (value, row) => row.rover.name,
      renderCell: (params) => {
        const rover = ROVERS.find(
          (r) => r.value === params.value.toLowerCase()
        );
        return (
          <Chip
            label={params.value}
            color={rover?.status === 'active' ? 'success' : 'default'}
            size="small"
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          startIcon={<Visibility />}
          size="small"
          onClick={() => onPhotoView?.(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  // Handle errors
  if (error) {
    return (
      <Card>
        <CardContent>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                <Refresh />
              </Button>
            }
          >
            <Typography variant="h6">NASA Connection Failed</Typography>
            Unable to load rover photos. This could be due to network issues or
            NASA API limits.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🛰️ Mars Rover Photo Explorer
        </Typography>

        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Rover</InputLabel>
              <Select
                value={filters.rover}
                label="Rover"
                onChange={(e) => handleFilterChange('rover', e.target.value)}
              >
                {ROVERS.map((rover) => (
                  <MenuItem key={rover.value} value={rover.value}>
                    {rover.label} ({rover.status})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Camera</InputLabel>
              <Select
                value={filters.camera || ''}
                label="Camera"
                onChange={(e) => handleFilterChange('camera', e.target.value)}
              >
                <MenuItem value="">All Cameras</MenuItem>
                {CAMERAS.map((camera) => (
                  <MenuItem key={camera.value} value={camera.value}>
                    {camera.value} - {camera.label}
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
              sx={{ minWidth: 150 }}
              helperText="Martian day number"
            />

            <TextField
              label="Earth Date"
              type="date"
              value={filters.earth_date || ''}
              onChange={(e) => handleFilterChange('earth_date', e.target.value)}
              sx={{ minWidth: 180 }}
              InputLabelProps={{ shrink: true }}
            />

            <Button
              variant="outlined"
              onClick={() => {
                setFilters({ rover: 'curiosity', sol: 1000 });
                setPaginationModel({ page: 0, pageSize: 25 });
              }}
            >
              Reset Filters
            </Button>
          </Stack>
        </Box>

        {/* Data Grid */}
        <Box sx={{ height: 600, maxHeight: '80vh', overflowY: 'auto' }}>
          {isLoading ? (
            <LoadingSpinner message="Loading Mars rover photos..." />
          ) : (
            <DataGrid
              rows={data?.photos || []}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[25, 50, 100]}
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                },
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
              }}
            />
          )}
        </Box>

        {/* Results Info */}
        {data && (
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
  );
};
