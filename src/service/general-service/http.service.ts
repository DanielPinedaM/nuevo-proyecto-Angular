import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { Observable, of, timeout } from 'rxjs';
import {
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

  private _timeout: number = 1000 * 60;

  /*
   ***************************
   * validar peticiones HTTP *
   *************************** */
  private executeRequest<T = any>(
    requestFn: () => Observable<T>,
    url: string = '',
    method: TMethod,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    // validar URL q llama al endpoint
    const urlString: string = String(url);
    if (
      !DataTypeClass.isString(url) ||
      urlString.trim() === '' ||
      urlString.includes('undefined') ||
      urlString.includes('null') ||
      urlString.includes('NaN') ||
      !urlString.startsWith('http')
    ) {
      return of({
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

      return of({
        success: false,
        status: 503,
        message,
        data: [] as unknown as T,
      });
    }

    const { body, showLoader, showLogger, isASecurityEndpoint } = options;

    if (body && method === 'GET') {
      return of({
        success: false,
        status: 400,
        message: `❌ el metodo GET NO puede tener body ${JSON.stringify(body)}`,
        data: [] as unknown as T,
      });
    }

    if (showLoader) this.loaderService.setLoader(true);

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

        return of({
          success: false,
          status: 401,
          message: 'Inice sesion para continuar',
          data: [] as unknown as T,
        });
      }
    } */

    return requestFn().pipe(
      timeout(this._timeout),
      map((response: any) => {
        this.requestDataUtils.successLogs({
          method,
          url,
          options,
          showLogger: showLogger as boolean,
          response,
        });

        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        const errorResponse: IResponse<T> = { ...error?.error, data: null };
        const status: number =
          typeof errorResponse?.status === 'number'
            ? errorResponse.status
            : error.status;

        this.requestDataUtils.errorHandling(status, url);

        this.requestDataUtils.errorLogs({
          method,
          url,
          options,
          showLogger: showLogger as boolean,
          response: errorResponse,
        });

        return of({
          success: false,
          status: status ?? 500,
          message:
            errorResponse?.message ?? 'no se pudo capturar error de la API',
          data: [] as unknown as T,
        });
      }),
      finalize(() => {
        if (showLoader) this.loaderService.setLoader(false);
      })
    );
  }

  /*
   ************************************************
   * metodos reactivos para llamar endpoint (API) *
   ************************************************ */
  public GET<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const config: IRequestOptions = {
      ...this.requestDataUtils.DEFAULT_OPTIONS(url),
      ...options,
    };

    const httpOptions = this.requestDataUtils.buildHttpOptions(config, 'GET');

    return this.executeRequest<T>(
      () => this.httpClient.get<T>(url, httpOptions) as Observable<T>,
      url,
      'GET',
      config
    );
  }

  public POST<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const config: IRequestOptions = {
      ...this.requestDataUtils.DEFAULT_OPTIONS(url),
      ...options,
    };

    const httpOptions = this.requestDataUtils.buildHttpOptions(config, 'POST');

    return this.executeRequest<T>(
      () => this.httpClient.get<T>(url, httpOptions) as Observable<T>,
      url,
      'POST',
      config
    );
  }

  public PUT<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const config: IRequestOptions = {
      ...this.requestDataUtils.DEFAULT_OPTIONS(url),
      ...options,
    };

    const httpOptions = this.requestDataUtils.buildHttpOptions(config, 'PUT');

    return this.executeRequest<T>(
      () => this.httpClient.get<T>(url, httpOptions) as Observable<T>,
      url,
      'PUT',
      config
    );
  }

  public PATCH<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const config: IRequestOptions = {
      ...this.requestDataUtils.DEFAULT_OPTIONS(url),
      ...options,
    };

    const httpOptions = this.requestDataUtils.buildHttpOptions(config, 'PATCH');

    return this.executeRequest<T>(
      () => this.httpClient.get<T>(url, httpOptions) as Observable<T>,
      url,
      'PATCH',
      config
    );
  }

  public DELETE<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const config: IRequestOptions = {
      ...this.requestDataUtils.DEFAULT_OPTIONS(url),
      ...options,
    };

    const httpOptions = this.requestDataUtils.buildHttpOptions(
      config,
      'DELETE'
    );

    return this.executeRequest<T>(
      () => this.httpClient.get<T>(url, httpOptions) as Observable<T>,
      url,
      'DELETE',
      config
    );
  }
}
