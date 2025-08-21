import { HttpParams } from '@angular/common/http';

/**
nombres de los metodos HTTP */
export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
parametros de funcion httpRequest para llamar a la API */
export type IResponseType = 'json' | 'text' | 'blob';

/**
type de query params */
type TQueryParams =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | readonly (string | number | boolean)[];
    };

/**
type de headers */
type THeaders = Record<string, string | number>;

export interface IRequestOptions<T = any> {
  isASecurityEndpoint?: boolean;
  body?: T;
  queryParams?: TQueryParams;
  headers?: THeaders;
  responseType?: IResponseType;
  showLoader?: boolean;
}

interface IData {
  timestamp: string;
  path: string;
  error: string | null;
}

/**
asi es como responde la API */
export interface IResponse {
  success: boolean;
  status: number;
  message: string;
  data: IData | any;
}

export type ResponseType = IResponse | Blob | FormData | any;

/**
parametros de funcion errorLogs() q se imprimen por consola  cuando hay errores */
export interface IObjectLogs {
  method?: TMethod;
  url?: string;
  options?: IRequestOptions;
  response: IResponse;
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
