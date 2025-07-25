// Mars Rover Photos API Types
export interface RoverPhoto {
  id: number;
  sol: number; // Martian day
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
  };
}

export interface RoverPhotosResponse {
  photos: RoverPhoto[];
}

export interface RoverPhotoFilters {
  rover: string;
  sol?: number;
  earth_date?: string;
  camera?: string;
  page?: number;
}

// APOD API Types
export interface APODData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

// Error Types
export interface NASAApiError {
  message: string;
  status?: number;
  code?: string;
}