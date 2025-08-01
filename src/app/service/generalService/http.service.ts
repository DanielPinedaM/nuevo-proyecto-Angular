import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, timeout } from 'rxjs';
import path from '@/app//models/constants/path.constants';
import { LoaderService } from '@/app/service/RxJS-BehaviorSubject/layout/loader.service';
import { objSessionStorage } from '@/app/models/constants/session-storage.constants';
import {
  sessionStorageListValue,
  sessionStorageSearch,
} from '@/app/utils/func/sessionStorage.utils';
import {
  IHttpErrorResponse,
  IObjectLogs,
  IRequestOptions,
  IResponse,
  ResponseType,
  TMethod,
} from '@/app/service/generalService/types/requestDataTypes';
import { environment } from '@/environments/environment';
import DataTypeClass from '@/app/utils/class/DataTypeClass.utils';
import HotToastClass from '@/app/utils/class/notification/HotToastClass.utils';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpHeader!: HttpHeaders;
  private _timeout: number = 1000 * 60;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private hotToast: HotToastClass
  ) {}

  public async request<T extends ResponseType = ResponseType>(
    method: TMethod,
    url: string = '',
    options: IRequestOptions = {}
  ): Promise<ResponseType> {
    // validar env en los q NO se incluye en token
    if (!environment.auth.login) {
      return Promise.resolve({
        success: false,
        status: 401,
        message: `la VARIABLE DE ENTORNO PARA EL LOGIN ${environment.auth.login} tiene que ser tipo string y NO puede estar vacia ''`,
        data: [],
      }) as T;
    }

    // validar URL q llama al endpoint
    if (
      !DataTypeClass.isString(url) ||
      String(url).trim() === '' ||
      String(url).includes('undefined') ||
      String(url).includes('null') ||
      String(url).includes('NaN') ||
      !String(url).startsWith('http')
    ) {
      return Promise.resolve({
        success: false,
        status: 400,
        message: `La URL '${url}' es invalida`,
        data: [],
      }) as T;
    }

    // validar q tenga conexion a internet
    if (!window?.navigator?.onLine) {
      const message: string =
        'Conéctese a internet para que la página web pueda funcionar';

      this.hotToast.errorNotification(message);

      return Promise.resolve({
        success: false,
        status: 503,
        message,
        data: [],
      }) as T;
    }

    const {
      // enviar token en TODOS los endpoint, EXCEPTO al iniciar sesion
      isASecurityEndpoint = url !== environment.auth.login,

      body,
      queryParams,
      headers = {},
      responseType = 'json',
      showLoader = true,
    } = options;

    if (body && method === 'GET') {
      return Promise.resolve({
        success: false,
        status: 400,
        message: `❌ el metodo GET NO puede tener body ${JSON.stringify(body)}`,
        data: [],
      }) as T;
    }

    if (showLoader) {
      this.loaderService.setLoader(true);
    }

    this.httpHeader = new HttpHeaders(headers);

    // Agregar token si el endpoint lo necesita
    if (isASecurityEndpoint) {
      const token: string | null = sessionStorageListValue(
        objSessionStorage.token!
      );

      if (sessionStorageSearch(objSessionStorage.token!)) {
        // agregar token a los headers
        this.httpHeader = this.httpHeader.append(
          'authorization',
          `Bearer ${token}`
        );
      } else {
        console.error(`❌ error no se pudo obtener el token ${token}`);

        this.unauthorized();

        return Promise.resolve({
          success: false,
          status: 401,
          message: 'Inice sesion para continuar',
          data: [],
        }) as T;
      }
    }

    let response = new Observable<T>();

    const httpOptions = {
      headers: this.httpHeader,
      // HttpClient.responseType requiere 'json', pero puedes engañar al sistema usando cualquier string como 'json'.
      responseType: responseType as 'json',
      params: queryParams,
    };

    try {
      switch (method) {
        case 'GET':
          response = this.httpClient.get<T>(url, httpOptions);
          break;
        case 'POST':
          response = this.httpClient.post<T>(url, body, httpOptions);
          break;
        case 'PUT':
          response = this.httpClient.put<T>(url, body, httpOptions);
          break;
        case 'PATCH':
          response = this.httpClient.patch<T>(url, body, httpOptions);
          break;
        case 'DELETE':
          response = this.httpClient.delete<T>(url, {
            ...httpOptions,
            body,
          });
          break;
      }

      response.pipe(timeout(this._timeout));

      const result: IResponse = (await lastValueFrom<T>(response)) as IResponse;

      /*
      descomentar para imprimir logs de peticiones HTTP
      this.successLogs({
        method,
        url,
        options,
        response: result,
      }); */

      return result;
    } catch (error: IHttpErrorResponse | any) {
      // la data es vacia porque la API respondio con un error
      const errorResponse: IResponse = { ...error?.error, data: null };

      const status: number = DataTypeClass.isNumber(errorResponse.status)
        ? errorResponse.status
        : error.status;

      this.errorHandling(status, url);

      if (error?.error && error instanceof HttpErrorResponse) {
        this.errorLogs({
          method,
          url,
          options,
          response: {
            success: errorResponse?.success,
            status: errorResponse?.status,
            message: errorResponse?.message,
            data: errorResponse?.data,
          },
        });

        // responder con status error de la API
        return Promise.resolve(errorResponse) as T;
      } else {
        console.error('❌ error ', error);
      }

      return Promise.resolve({
        success: false,
        status: 500,
        message: 'no se pudo capturar error de la API',
        data: null,
      }) as T;
    } finally {
      if (showLoader) {
        this.loaderService.setLoader(false);
      }
    }
  }

  private unauthorized(): void {
    this.router.navigate(['/' + path.auth.login]);
    this.loaderService.setLoader(false);
  }

  private redirectToLogin(): void {
    const login: string = '/' + path.auth.login;

    if (!this.pathnameIsLogin()) {
      window.location.href = login;
    }
  }

  private returnToBrowserHistory(): void {
    if (window.history.length > 1) {
      window.history.go(-1);
    } else {
      this.redirectToLogin();
    }
  }

  private pathnameIsLogin(): boolean {
    const login: string = '/' + path.auth.login;

    const pathname: string = window.location.pathname;

    return pathname === login;
  }

  /**
  manejo de errores */
  private errorHandling(status: number | undefined, url: string): void {
    if (!status) return;

    if (status === 401) {
      console.error(
        '❌ http.service.ts - Error 401: unauthenticated',
        '\nDetalle: El usuario no está autenticado o la sesión ha expirado',
        '\nAcción: Re-dirigir al usuario a la página de inicio de sesión',
        '\nURL solicitada: ',
        url
      );

      // re-dirigir a /iniciar-sesion cuando el status de la respuesta de la api sea 401
      this.unauthorized();

      if (!this.pathnameIsLogin()) {
        this.hotToast.infoNotification('Inicie sesión para continuar');
      }
    } else if (status === 403) {
      console.error(
        '❌ http.service.ts - Error 403: Forbidden',
        '\nDetalle: El usuario está autenticado pero no tiene permisos para acceder al recurso',
        "\nAcción: Mostrar un mensaje de 'acceso denegado' o re-dirigir y re-dirigir a la pagina web anterior en el historial del navegador",
        '\nURL solicitada:',
        url
      );

      // devolverme a la web anterior en el historial cuando el status de la respuesta de la api sea 403
      this.returnToBrowserHistory();

      this.hotToast.infoNotification(
        'Acceso denegado, no tiene permisos para realizar esta acción'
      );
    } else if (status === 404) {
      console.error(
        `❌ http.service.ts - error 404: Not Found - endpoint no encontrado, la URL solicitada "${url}" NO existe en el servidor`
      );

      this.hotToast.errorNotification(
        'Ha ocurrido un error, por favor comuniquese con el administrador del sistema'
      );
    } else if (status >= 500) {
      console.error(
        `❌ http.service.ts - error en el servidor en la URL ${url}`
      );

      this.hotToast.errorNotification(
        'Ha ocurrido un error, intentalo de nuevo mas tarde, estamos trabajando para solucionarlo'
      );
    }
  }

  /**
  ✅ imprime logs de cuando la peticion es exitosa */
  private successLogs(objectLogs: IObjectLogs): void {
    // NO imprimir logs en produccion
    if (environment.production) return;

    const { method, url, options, response } = objectLogs;

    console.info(`✅ [${method}] ${url}`);

    if (DataTypeClass.isFile(options?.body)) {
      console.info('✅ archivo(s) subido(s)');
    }

    if (options?.body) {
      console.info('body ', options?.body);
    }

    if (response) {
      let { success, status, message, data } = response;

      if (data) {
        if (Array.isArray(data)) {
          if (data.length === 0) {
            data = 'array vacío ➡️ (0) []';
          } else {
            // data es un array de objetos [{}]
            const areAllObjects: boolean = data?.every(
              (item) => typeof item === 'object' && item && item !== null
            );
            if (areAllObjects) {
              data = `array de objetos con ${data.length} elemento ➡️ (${data.length}) [{}]`;
            } else {
              // data es un array []
              data = `array de ${data.length} elementos ➡️ (${data.length}) []`;
            }
          }
        } else if (DataTypeClass.isLiteralObject(data)) {
          // data es un objeto literal {}
          const length: number | null = DataTypeClass.literalObjectLength(data);

          if (length === 0) {
            data = 'objeto literal vacío ➡️ (0) {}';
          } else {
            data = `objeto literal con ${length} keys ➡️ (${length}) {}`;
          }
        }
      }

      const objectSuccesResponse: IResponse = {
        success,
        status,
        message,
        data,
      };

      console.info(
        `respuesta de la API apuntando a ➡️ ${environment.publicEnvironment} ⬅️`,
        objectSuccesResponse
      );
    }

    console.info('\n');
  }

  /**
  ❌ imprime logs de cuando la peticion da error */
  private errorLogs(objectLogs: IObjectLogs): void {
    // NO imprimir logs en produccion
    if (environment.production) return;

    const { method, url, options, response } = objectLogs;

    console.error('❌ error ');
    if (method) console.error('metodo HTTP', method);
    if (url) console.error('url ', url);
    if (environment.publicEnvironment)
      console.error(
        `las variables de entorno estan apuntando al ambiente de ➡️ ${environment.publicEnvironment} ⬅️`
      );
    if (options) console.error('options ', options);
    if (response) console.error('response ', response);

    console.info('\n');
  }
}
