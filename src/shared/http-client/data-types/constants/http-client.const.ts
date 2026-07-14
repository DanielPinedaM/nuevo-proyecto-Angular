import { ApiResponse } from '@/shared/http-client/data-types/interfaces/http-client.interface';

export const API_RESPONSE_KEYS = {
  success: 'success',
  status: 'status',
  message: 'message',
  data: 'data',
} as const satisfies Record<keyof ApiResponse, keyof ApiResponse>;

export const REQUIRED_KEYS = [
  'success',
  'status',
  'message',
  'data',
] satisfies (keyof ApiResponse)[];
