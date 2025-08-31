import { HttpHeaders, HttpParams } from '@angular/common/http';

/**
nombres de los metodos HTTP */
export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
tipo de respuesta HTTP */
export type IResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

/**
type de query params */
type TParams =
  | HttpParams
  | Record<
      string,
      string | number | boolean | readonly (string | number | boolean)[]
    >
  | undefined;
/**
type de headers */
type THeaders = HttpHeaders | Record<string, string | string[]> | undefined;

export interface IRequestOptions<T = any> {
  body?: T;
  params?: TParams;
  headers?: THeaders;
  responseType?: IResponseType;
  showLoader?: boolean;
  showLogger?: boolean;

  isASecurityEndpoint?: boolean;
  withCredentials?: boolean;
}

/**
asi es como responde la API */
export interface IResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

export type ResponseType = IResponse | Blob | FormData | any;

/**
parametros de funcion errorLogs() q se imprimen por consola  cuando hay errores */
export interface IObjectLogs {
  method?: TMethod;
  url?: string;
  options?: IRequestOptions;
  response: IResponse;
  showLogger: boolean;
}

/**
este es el formato (tipo de dato) q Angular le da a los errores */
export interface IHttpErrorResponse {
  headers: {
    headers: any;
    normalizedNames: any;
    lazyUpdate: any;
  };
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: IResponse;
}
