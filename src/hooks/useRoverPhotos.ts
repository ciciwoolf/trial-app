import { useQuery } from '@tanstack/react-query';
import { nasaApi } from '../services/nasaApi';
import type { RoverPhotoFilters } from '../types/nasa';

export const useRoverPhotos = (filters: RoverPhotoFilters) => {
  return useQuery({
    queryKey: ['roverPhotos', filters],
    queryFn: () => nasaApi.getRoverPhotos(filters),
    enabled: !!filters.rover, // Only run if rover is selected
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};