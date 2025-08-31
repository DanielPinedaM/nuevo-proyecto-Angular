import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@/environments/environment';
import { LoaderService } from '@/service/RxJS-BehaviorSubject/layout/loader.service';
import path from '@/models/constants/path.constants';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import {
  IObjectLogs,
  IRequestOptions,
  IResponse,
  TMethod,
} from '@/service/general-service/types/request-data.types';
import DataTypeClass from '@/utils/class/DataTypeClass.utils';
import { HttpHeaders } from '@angular/common/http';

export class RequestDataUtils {
  private hotToast = inject(HotToastClass);
  private router = inject(Router);
  private loaderService = inject(LoaderService);

  unauthorized(): void {
    this.router.navigate(['/' + path.auth.login]);
    this.loaderService.setLoader(false);
  }

  redirectToLogin(): void {
    const login: string = '/' + path.auth.login;

    if (!this.pathnameIsLogin()) {
      window.location.href = login;
    }
  }

  returnToBrowserHistory(): void {
    if (window.history.length > 1) {
      window.history.go(-1);
    } else {
      this.redirectToLogin();
    }
  }

  pathnameIsLogin(): boolean {
    const login: string = '/' + path.auth.login;

    const pathname: string = window.location.pathname;

    return pathname === login;
  }

  /**
  manejo de errores */
  errorHandling(status: number | undefined, url: string): void {
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
  successLogs(objectLogs: IObjectLogs): void {
    // NO imprimir logs en produccion
    if (environment.production) return;

    const { method, url, options, response, showLogger } = objectLogs;

    if (!showLogger) return;

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
  errorLogs(objectLogs: IObjectLogs): void {
    // NO imprimir logs en produccion
    if (environment.production) return;

    const { method, url, options, response, showLogger } = objectLogs;

    if (!showLogger) return;

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

  /**
  validar env en los q por defecto NO se incluye el token */
  defaultSecurityEndpoint(url: string): boolean {
    // aqui agregar nuevos env a los q NO se les envia el token al hacer peticion http
    const unprotectedURLs: string[] = [environment.auth.login] as string[];

    for (const item of unprotectedURLs) {
      if (!DataTypeClass.isString(item)) {
        console.error(
          `❌ ERROR CRÍTICO\n verifica q el env ${item} este agregado a las variables de entorno \n unprotectedURLs`,
          unprotectedURLs
        );
        return false;
      }
    }

    // validar env en los q NO se incluye en token
    return !unprotectedURLs.some((item: string) => url === item);
  }

  /**
  configuraciones por defecto para llamar la API */
  DEFAULT_OPTIONS(url: string): IRequestOptions {
    return {
      body: undefined,
      params: {},
      headers: {},
      responseType: 'json',
      showLoader: true,
      showLogger: true,

      // enviar token en TODOS los endpoint, EXCEPTO los q estan en const unprotectedURLs: string[]
      //isASecurityEndpoint: this.defaultSecurityEndpoint(url),
      withCredentials: this.defaultSecurityEndpoint(url),
    };
  }

  /**
  opciones q recibe Angular httpClient */
  buildHttpOptions(options: IRequestOptions, method: TMethod): any {
    const { body, params, headers, responseType, withCredentials } = options;

    return {
      // NO agregar body al metodo HTTP GET
      ...(method !== 'GET' && body ? { body } : {}),
      ...(headers
        ? {
            headers: new HttpHeaders(
              headers as Record<string, string | string[]>
            ),
          }
        : {}),
      params,
      responseType,
      withCredentials,
    };
  }
}
