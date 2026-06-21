import { HttpHeaders, HttpParams } from '@angular/common/http';
import type { IResponse } from '@/shared/services/api/http-client/data-types/interfaces/gateway.interface';

/**
nombres de los metodos HTTP */
export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
tipo de respuesta HTTP */
export type IResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

/**
type de query params */
export type TParams =
  | HttpParams
  | Record<
      string,
      string | number | boolean | readonly (string | number | boolean)[]
    >
  | undefined;
/**
type de headers */
export type THeaders =
  | HttpHeaders
  | Record<string, string | string[]>
  | undefined;

export type ResponseType = IResponse | Blob | FormData | any;
