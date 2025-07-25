import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  RoverPhotosResponse,
  RoverPhotoFilters,
  APODData,
  NASAApiError,
} from '../types/nasa';

/* eslint-disable @typescript-eslint/no-explicit-any */

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const BASE_URL = import.meta.env.VITE_NASA_BASE_URL;

class NASAApiService {
  private api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
  });

  constructor() {
    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        throw this.handleError(error);
      }
    );
  }

  async getRoverPhotos(
    filters: RoverPhotoFilters
  ): Promise<RoverPhotosResponse> {
    const { rover, sol, earth_date, camera, page = 1 } = filters;

     
    const params: any = {
      api_key: API_KEY,
      page,
    };

    // Add optional parameters
    if (sol) params.sol = sol;
    if (earth_date) params.earth_date = earth_date;
    if (camera) params.camera = camera;

    console.log(`Fetching rover photos for ${rover}:`, params);

    const response = await this.api.get(
      `/mars-photos/api/v1/rovers/${rover}/photos`,
      {
        params,
      }
    );

    return response.data;
  }

  async getAPOD(date?: string): Promise<APODData> {
    const params: any = { api_key: API_KEY };
    if (date) params.date = date;

    const response = await this.api.get('/planetary/apod', { params });
    return response.data;
  }

  private handleError(error: any): NASAApiError {
    if (error.response?.status === 429) {
      return {
        message: 'NASA API rate limit exceeded. Please try again later.',
        status: 429,
        code: 'RATE_LIMIT',
      };
    }

    if (error.response?.status === 404) {
      return {
        message: 'No data found for the requested parameters.',
        status: 404,
        code: 'NOT_FOUND',
      };
    }

    if (error.code === 'ECONNABORTED') {
      return {
        message: 'Request timeout. NASA servers may be busy.',
        status: 408,
        code: 'TIMEOUT',
      };
    }

    return {
      message:
        error.response?.data?.error?.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      code: 'UNKNOWN',
    };
  }
}

export const nasaApi = new NASAApiService();
