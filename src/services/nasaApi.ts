import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  RoverPhotosResponse,
  RoverPhotoFilters,
  NASAApiError,
} from '../types/nasa';

/* eslint-disable @typescript-eslint/no-explicit-any */

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const BASE_URL = import.meta.env.VITE_NASA_BASE_URL || 'https://api.nasa.gov';

class NASAApiService {
  private api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
  });

  constructor() {
    // Check if API key is missing
    if (!API_KEY) {
      console.warn(
        'NASA API key is not configured. Please check your .env file.'
      );
    }
    // Add response interceptor - catches all axios errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('NASA API Error:', {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message,
          timestamp: new Date().toISOString(),
        });
        throw this.handleError(error);
      }
    );
  }

  async getRoverPhotos(
    filters: RoverPhotoFilters
  ): Promise<RoverPhotosResponse> {
    // Check if API key is missing before making the request
    if (!API_KEY) {
      throw {
        message:
          'NASA API key is not configured. Please create a .env file with VITE_NASA_API_KEY.',
        status: 500,
        code: 'CONFIG_ERROR',
      };
    }

    const { rover, sol, earth_date, camera, page = 1 } = filters;

    const params: any = {
      api_key: API_KEY,
      page,
    };

    // Add optional parameters
    if (sol) params.sol = sol;
    if (earth_date) params.earth_date = earth_date;
    if (camera) params.camera = camera;

    const response = await this.api.get(
      // `/mars-photos/api/v1/rovers/${rover}/broken`,
      `/mars-photos/api/v1/rovers/${rover}/photos`,
      {
        params,
      }
    );

    return response.data;
  }

  private handleError(error: any): NASAApiError {
    // Handle missing API key configuration
    if (error.code === 'CONFIG_ERROR') {
      return {
        message: error.message,
        status: error.status,
        code: error.code,
      };
    }

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
