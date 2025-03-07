import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, timeout } from 'rxjs';
import path from '../../types/constants/cons-path';
import { LoaderService } from '../RxJS-BehaviorSubject/layout/loader.service';
import { objSessionStorage } from '@/app/types/constants/const-session-storage';
import {
  sessionStorageListValue,
  sessionStorageSearch,
} from '@/app/utils/func/sessionStorage';
import {
  IObjectLogs,
  IRequestOptions,
  ResponseType,
  TMethod,
} from './types/requestDataTypes';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpHeader!: HttpHeaders;
  private _timeout: number = 1000 * 60;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  public async request<T extends ResponseType = ResponseType>(
    method: TMethod,
    url: string = '',
    options: IRequestOptions = {}
  ): Promise<ResponseType> {
    if (!environment.auth.login) {
      const message: string = ` la VARIABLE DE ENTORNO PARA EL LOGIN ${environment.auth.login} tiene que ser tipo string y NO puede estar vacia ''`;

      return Promise.resolve({
        success: false,
        status: 401,
        message,
        data: [],
      }) as T;
    }

    if (
      !url ||
      String(url)?.trim() === '' ||
      String(url)?.includes('undefined') ||
      String(url)?.includes('null') ||
      String(url)?.includes('NaN') ||
      !String(url)?.includes('http')
    ) {
      return Promise.resolve({
        success: false,
        status: 400,
        message: `La URL '${url}' es invalida`,
        data: [],
      }) as T;
    }

    this.loaderService.setLoader(true);

    const {
      // enviar token en TODOS los endpoint, EXCEPTO al iniciar sesion
      isASecurityEndpoint = url !== environment.auth.login,

      body,
      queryParams,
      headers = {},
      responseType = 'json',
    } = options;

    this.httpHeader = new HttpHeaders(headers);

    // Agregar token si el endpoint lo necesita
    if (isASecurityEndpoint) {
      const token: string | null = sessionStorageListValue(objSessionStorage.token!);

      if (sessionStorageSearch(objSessionStorage.token!)) {
        // agregar token a los headers
        this.httpHeader = this.httpHeader.append(
          'authorization',
          `Bearer ${token}`
        );
      } else {
        const message: string = `error no se pudo obtener el token ${token}`;

        this.unauthorized();

        return Promise.resolve({
          success: false,
          status: 401,
          message,
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

      return await lastValueFrom<T>(response);
    } catch (error: any) {
      const message: string = 'al ejecutar petición http';

      this.errorLogs({
        message,
        method,
        url,
        options,
      });

      if (error instanceof HttpErrorResponse) {
        if ([500, 404].includes(error['status'])) throw error;

        if (error?.error?.status === 401) {
          this.unauthorized();

          console.error(
            '❌ Error 401: unauthenticated',
            '\nDetalle: El usuario no está autenticado o la sesión ha expirado',
            '\nAcción: Re-dirigir al usuario a la página de inicio de sesión'
          );

          return Promise.resolve({
            success: false,
            status: 401,
            message: 'Error 401: unauthenticated ',
            data: [],
          }) as T;
        }
      }

      if (error?.error) {
        throw error.error;
      }

      return Promise.resolve({
        success: false,
        status: 400,
        message,
        data: [],
      }) as T;
    } finally {
      this.loaderService.setLoader(false);
    }
  }

  private unauthorized(): void {
    this.router.navigate(['/' + path.auth.login]);
    this.loaderService.setLoader(false);
  }

  private errorLogs(objectLogs: IObjectLogs): void {
    // NO imprimir logs en produccion
    if (environment.production) return;

    const { message, method, url, options } = objectLogs;

    if (message) console.error('❌ error ', message);
    if (method) console.error('metodo HTTP', method);
    if (url) console.error('url ', url);
    if (environment.publicEnvironment)
      console.error(
        `las variables de entorno estan apuntando al ambiente de ➡️ ${environment.publicEnvironment} ⬅️`
      );

    if (options) console.error('options ', options);

    console.info('\n');
  }
}
