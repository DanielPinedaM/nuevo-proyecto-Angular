import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, timeout } from 'rxjs';
import {
  IHttpErrorResponse,
  IRequestOptions,
  IResponse,
  TMethod,
} from '@/service/general-service/types/request-data.types';
import DataTypeClass from '@/utils/class/DataTypeClass.utils';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import { RequestDataUtils } from '@/service/general-service/utils/request-data.utils';
import { LoaderService } from '@/service/RxJS-BehaviorSubject/layout/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpClient = inject(HttpClient);
  private hotToast = inject(HotToastClass);
  private requestDataUtils = inject(RequestDataUtils);
  private loaderService = inject(LoaderService);

  private httpHeader!: HttpHeaders;
  private _timeout: number = 1000 * 60;

  /*
   ***************************
   * validar peticiones HTTP *
   *************************** */
  private async httpService<T>(
    method: TMethod,
    url: string = '',
    options: IRequestOptions = {}
  ): Promise<IResponse<T>> {
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
        data: [] as unknown as T,
      });
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
        data: [] as unknown as T,
      });
    }

    const {
      body,
      queryParams,
      headers = {},
      responseType = 'json',
      showLoader = true,
      showLogger = true,

      // enviar token en TODOS los endpoint, EXCEPTO los q estan en const unprotectedURLs: string[]
      //isASecurityEndpoint = this.defaultSecurityEndpoint(url),
      withCredentials = this.requestDataUtils.defaultSecurityEndpoint(url),
    } = options;

    if (body && method === 'GET') {
      return Promise.resolve({
        success: false,
        status: 400,
        message: `❌ el metodo GET NO puede tener body ${JSON.stringify(body)}`,
        data: [] as unknown as T,
      });
    }

    if (showLoader) this.loaderService.setLoader(true);

    this.httpHeader = new HttpHeaders(headers);

    // Agregar token si el endpoint lo necesita
    /*
    des-comentar para enviar token por headers authorization Bearer. ⚠️ Esto se puede hackear con ataque XSS 🚨
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
          data: [] as unknown as T,
        });
      }
    } */

    let response: Observable<T> = new Observable<T>();

    const httpOptions = {
      headers: this.httpHeader,
      // HttpClient.responseType requiere 'json', pero puedes engañar al sistema usando cualquier string como 'json'.
      responseType: responseType as 'json',
      params: queryParams,
      withCredentials,
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

      this.requestDataUtils.successLogs({
        method,
        url,
        options,
        showLogger,
        response: result,
      });

      return result;
    } catch (error: IHttpErrorResponse | any) {
      // la data es vacia porque la API respondio con un error
      const errorResponse: IResponse = { ...error?.error, data: null };

      const status: number = DataTypeClass.isNumber(errorResponse.status)
        ? errorResponse.status
        : error.status;

      this.requestDataUtils.errorHandling(status, url);

      if (error?.error && error instanceof HttpErrorResponse) {
        this.requestDataUtils.errorLogs({
          method,
          url,
          options,
          showLogger,
          response: {
            success: errorResponse?.success,
            status: errorResponse?.status,
            message: errorResponse?.message,
            data: errorResponse?.data,
          },
        });

        // responder con status error de la API
        return Promise.resolve(errorResponse);
      } else {
        console.error('❌ error ', error);
      }

      return Promise.resolve({
        success: false,
        status: 500,
        message: 'no se pudo capturar error de la API',
        data: [] as unknown as T,
      });
    } finally {
      if (showLoader) {
        this.loaderService.setLoader(false);
      }
    }
  }

  public GET<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T> {
    return this.httpService('GET', url, options);
  }
}
