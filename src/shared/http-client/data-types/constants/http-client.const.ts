import { ApiResponse } from '@/shared/http-client/data-types/interfaces/http-client.interface';

/**
 * acceso tipado a UNA key puntual de ApiResponse. Ejemplo: API_RESPONSE_KEYS.success */
export const API_RESPONSE_KEYS = {
  success: 'success',
  status: 'status',
  message: 'message',
  data: 'data',
} as const satisfies Record<keyof ApiResponse, keyof ApiResponse>;

/**
 * array de las keys de ApiResponse para ITERAR. Ejemplo. REQUIRED_KEYS.every(...) */
export const REQUIRED_KEYS = [
  'success',
  'status',
  'message',
  'data',
] satisfies (keyof ApiResponse)[];

export const FALLBACK_MESSAGE: string = 'no se pudo capturar el mensaje de error de la API';
