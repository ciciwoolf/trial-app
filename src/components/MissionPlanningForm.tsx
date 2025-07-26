import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Stack,
  FormHelperText,
} from '@mui/material';
import { Rocket } from '@mui/icons-material';

// Validation schema
const missionSchema = yup.object({
  missionName: yup
    .string()
    .required('Mission name is required')
    .min(3, 'Mission name must be at least 3 characters'),
  teamLeader: yup
    .string()
    .required('Team leader name is required')
    .min(2, 'Team leader name must be at least 2 characters'),
  crewMembers: yup
    .number()
    .required('Number of crew members is required')
    .min(2, 'Mission needs at least 2 crew members')
    .max(8, 'Maximum 8 crew members allowed'),
  launchDate: yup
    .date()
    .required('Launch date is required')
    .min(new Date(), 'Launch date must be in the future'),
  roverType: yup.string().required('Please select a rover type'),
  missionGoals: yup
    .string()
    .required('Mission goals are required')
    .min(20, 'Mission goals must be at least 20 characters'),
});

type MissionFormData = yup.InferType<typeof missionSchema>;

const ROVER_OPTIONS = [
  { value: 'curiosity', label: 'Curiosity - Advanced Laboratory' },
  { value: 'opportunity', label: 'Opportunity - Long-Range Explorer' },
];

export const MissionPlanningForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [missionData, setMissionData] = useState<MissionFormData | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<MissionFormData>({
    resolver: yupResolver(missionSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: MissionFormData) => {
    // Save to localStorage
    localStorage.setItem('marsMission', JSON.stringify(data));
    setMissionData(data);
    setIsSubmitted(true);
  };

  const handleNewMission = () => {
    setIsSubmitted(false);
    setMissionData(null);
    reset();
  };

  if (isSubmitted && missionData) {
    return (
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <CardContent>
          <Stack spacing={{ xs: 2, sm: 3 }} alignItems="center">
            <Rocket sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography variant="h4" color="primary" gutterBottom>
              🚀 Mission Approved!
            </Typography>
            <Typography variant="h6" gutterBottom>
              "{missionData.missionName}"
            </Typography>
            <Box sx={{ textAlign: 'left', width: '100%' }}>
              <Typography variant="body1" gutterBottom>
                <strong>Team Leader:</strong> {missionData.teamLeader}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Crew Size:</strong> {missionData.crewMembers} members
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Launch Date:</strong>{' '}
                {new Date(missionData.launchDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Rover:</strong>{' '}
                {
                  ROVER_OPTIONS.find((r) => r.value === missionData.roverType)
                    ?.label
                }
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Mission Goals:</strong>
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', pl: 2 }}>
                {missionData.missionGoals}
              </Typography>
            </Box>
            <Button variant="contained" onClick={handleNewMission}>
              Plan Another Mission
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="primary">
          🛰️ Plan Your Mars Mission
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Design your own Mars exploration mission! Fill out all the details
          below.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Mission Name */}
            <Controller
              name="missionName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mission Name"
                  fullWidth
                  error={!!errors.missionName}
                  helperText={errors.missionName?.message}
                  placeholder="e.g., Red Planet Explorer 2025"
                />
              )}
            />

            {/* Team Leader */}
            <Controller
              name="teamLeader"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Team Leader Name"
                  fullWidth
                  error={!!errors.teamLeader}
                  helperText={errors.teamLeader?.message}
                  placeholder="Enter your name"
                />
              )}
            />

            {/* Crew Members */}
            <Controller
              name="crewMembers"
              control={control}
              defaultValue={4}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number of Crew Members"
                  type="number"
                  fullWidth
                  error={!!errors.crewMembers}
                  helperText={
                    errors.crewMembers?.message || 'Between 2-8 crew members'
                  }
                  slotProps={{
                    htmlInput: { min: 2, max: 8 },
                  }}
                />
              )}
            />

            {/* Launch Date */}
            <Controller
              name="launchDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Launch Date"
                  type="date"
                  fullWidth
                  error={!!errors.launchDate}
                  helperText={errors.launchDate?.message}
                  slotProps={{
                    htmlInput: { shrink: true },
                    inputLabel: {
                      shrink: true,
                      sx: {
                        // make the mobile view better
                        transform: {
                          xs: 'translate(14px, -9px) scale(0.75)',
                          sm: 'translate(14px, -9px) scale(0.75)',
                        },
                        transformOrigin: 'top left',
                      },
                    },
                  }}
                />
              )}
            />

            {/* Rover Type */}
            <Controller
              name="roverType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.roverType}>
                  <InputLabel>Rover Type</InputLabel>
                  <Select {...field} label="Rover Type">
                    {ROVER_OPTIONS.map((rover) => (
                      <MenuItem key={rover.value} value={rover.value}>
                        {rover.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.roverType && (
                    <FormHelperText>{errors.roverType.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            {/* Mission Goals */}
            <Controller
              name="missionGoals"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mission Goals"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.missionGoals}
                  helperText={
                    errors.missionGoals?.message ||
                    'Describe what you hope to discover on Mars'
                  }
                  placeholder="e.g., Search for signs of past life, study Martian geology, test new technologies..."
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                      sx: {
                        transform: {
                          xs: 'translate(14px, -12px) scale(0.75)',
                          sm: 'translate(14px, -9px) scale(0.75)',
                        },
                        transformOrigin: 'top left',
                      },
                    },
                  }}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isValid}
              startIcon={<Rocket />}
            >
              Launch Mission
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
