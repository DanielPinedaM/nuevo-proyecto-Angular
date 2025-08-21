import { HttpParams } from '@angular/common/http';

/**
nombres de los metodos HTTP */
export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
parametros de funcion httpRequest para llamar a la API */
export type IResponseType = 'json' | 'text' | 'blob';

// primitivos
type TPrimitive =
  | string
  | number
  | boolean
  | null
  | undefined
  | symbol
  | bigint;

// objetos genericos
type TKeyRecord = string | number | symbol;
type TRecursive = TPrimitive | TRecursiveObject | TAnyArray;
type TRecursiveObject =
  | { [key: string]: TRecursive }
  | { [key: number]: TRecursive }
  | { [key: symbol]: TRecursive };
type TObject = object | Record<TKeyRecord, unknown>;

// arrays
type TAnyArray = Array<TPrimitive | TObject | TAnyArray>;

// archivos
export type TFiles =
  | Blob
  | File
  | ArrayBuffer
  | ArrayBufferView
  | DataView
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array;

// formularios
export type TFormTypes = FormData | URLSearchParams;

// tipo body
type TBody =
  | TPrimitive
  | TObject
  | TRecursiveObject
  | TAnyArray
  | TFiles
  | TFormTypes;

export interface IRequestOptions {
  isASecurityEndpoint?: boolean;
  body?: TBody;
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
