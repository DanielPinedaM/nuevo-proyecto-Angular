import type {
  TMethod,
  TParams,
  THeaders,
  IResponseType,
} from '@/shared/services/api/http-client/data-types/types/gateway.type';

export interface IRequestOptions<T = any> {
  body?: T;
  params?: TParams;
  headers?: THeaders;
  responseType?: IResponseType;
  showLoader?: boolean;
  showLogger?: boolean;
  executeErrorHandling?: boolean;

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
