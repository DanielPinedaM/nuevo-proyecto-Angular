import { HttpParams } from '@angular/common/http';

/**
nombres de los metodos HTTP */
export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
parametros de funcion httpRequest para llamar a la API */
export type IResponseType = 'json' | 'text' | 'blob';

export interface IRequestOptions {
  isASecurityEndpoint?: boolean;
  body?: any;
  queryParams?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | readonly (string | number | boolean)[];
      };
  headers?: {
    [name: string]: string | number | (string | number)[];
  };
  responseType?: IResponseType;
}

/**
asi es como responde la API */
export interface IResponse {
  success: boolean;
  status: number;
  message: string;
  data: any;
}

export type ResponseType = IResponse | Blob | FormData | any;

/**
parametros de funcion errorLogs() q se imprimen por consola  cuando hay errores */
export interface IObjectLogs {
  message?: string;
  method?: TMethod;
  url?: string;
  options?: IRequestOptions;
}
