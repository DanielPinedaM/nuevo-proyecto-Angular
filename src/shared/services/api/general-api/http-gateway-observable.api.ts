import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { Observable, of, timeout } from 'rxjs';
import {
  IRequestOptions,
  IResponse,
  TMethod,
} from '@/shared/services/api/general-api/types/request-data.types';
import ToastUtilsService from '@/shared/utils/class/Toast.utils';
import { LoaderService } from '@/shared/services/stores/loader.store';
import { environment } from '@/environments/environment';
import { RequestDataUtils } from '@/shared/services/api/general-api/utils/request-data.utils';
import Storage from '@/shared/utils/class/SessionStorageClass.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayService {
  private storage = inject(Storage);
  private httpClient = inject(HttpClient);
  private toast = inject(ToastUtilsService);
  private requestDataUtils = inject(RequestDataUtils);
  private loaderService = inject(LoaderService);
  private _timeout: number = 1000 * 60;

  /*
   ***************************
   * validar peticiones HTTP *
   *************************** */
  #executeRequest<T = any>(
    requestFn: () => Observable<T>,
    url: string = '',
    method: TMethod,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    // validar URL q llama al endpoint
    const urlString: string = String(url);
    if (!urlString.startsWith('http') || urlString === environment.api) {
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

      this.toast.error(message);

      return of({
        success: false,
        status: 503,
        message,
        data: [] as unknown as T,
      });
    }

    const {
      showLoader,
      showLogger,
      isASecurityEndpoint,
      executeErrorHandling,
    } = options;

    if (showLoader) this.loaderService.setLoader(true);

    // Agregar token si el endpoint lo necesita
    /*
    des-comentar para enviar token por headers authorization Bearer. ⚠️ Esto se puede hackear con ataque XSS 🚨
    if (isASecurityEndpoint) {
      const token: string | null = this.storage.listValue(
        objSessionStorage.token!
      );

      if (this.storage.search(objSessionStorage.token!)) {
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
            : error?.status;

        if (executeErrorHandling)
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
    const httpOptions = this.requestDataUtils.buildHttpOptions(url, options);

    return this.#executeRequest<T>(
      () => this.httpClient.get<T>(url, httpOptions) as Observable<T>,
      url,
      'GET',
      options
    );
  }

  public POST<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const httpOptions = this.requestDataUtils.buildHttpOptions(url, options);

    return this.#executeRequest<T>(
      () =>
        this.httpClient.post<T>(
          url,
          options?.body ?? {},
          httpOptions
        ) as Observable<T>,
      url,
      'POST',
      options
    );
  }

  public PUT<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const httpOptions = this.requestDataUtils.buildHttpOptions(url, options);

    return this.#executeRequest<T>(
      () =>
        this.httpClient.put<T>(
          url,
          options?.body ?? {},
          httpOptions
        ) as Observable<T>,
      url,
      'PUT',
      options
    );
  }

  public PATCH<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const httpOptions = this.requestDataUtils.buildHttpOptions(url, options);

    return this.#executeRequest<T>(
      () =>
        this.httpClient.patch<T>(
          url,
          options?.body ?? {},
          httpOptions
        ) as Observable<T>,
      url,
      'PATCH',
      options
    );
  }

  public DELETE<T = any>(
    url: string,
    options: IRequestOptions = {}
  ): Observable<T | IResponse> {
    const method: TMethod = 'DELETE';

    const httpOptions = this.requestDataUtils.buildHttpOptions(url, options);

    return this.#executeRequest<T>(
      () =>
        this.httpClient.request<T>(method, url, {
          body: options?.body ?? {},
          ...httpOptions,
        }) as Observable<T>,
      url,
      method,
      options
    );
  }
}
