import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { Observable, of, timeout } from 'rxjs';
import {
  IRequestOptions,
  IResponse,
} from '@/shared/services/api/http-client/data-types/interfaces/gateway.interface';
import { TMethod } from '@/shared/services/api/http-client/data-types/types/gateway.type';
import ToastService from '@/shared/services/Toast.service';
import { LoaderService } from '@/shared/services/stores/loader.store';
import { environment } from '@/environments/environment';
import { GatewayHelperService } from '@/shared/services/api/http-client/gateway-helper.service';
import SessionStorageService from '@/shared/services/SessionStorage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayService {
  private storage = inject(SessionStorageService);
  private httpClient = inject(HttpClient);
  private toast = inject(ToastService);
  private gatewayHelper = inject(GatewayHelperService);
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
    options: IRequestOptions = {},
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
        this.gatewayHelper.successLogs({
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

        if (executeErrorHandling) this.gatewayHelper.errorHandling(status, url);

        this.gatewayHelper.errorLogs({
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
      }),
    );
  }

  /*
   ************************************************
   * metodos reactivos para llamar endpoint (API) *
   ************************************************ */
  GET<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Observable<T | IResponse> {
    const httpOptions = this.gatewayHelper.buildHttpOptions(url, options);

    return this.executeRequest<T>(
      () => this.httpClient.get<T>(url, httpOptions) as Observable<T>,
      url,
      'GET',
      options,
    );
  }

  POST<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Observable<T | IResponse> {
    const httpOptions = this.gatewayHelper.buildHttpOptions(url, options);

    return this.executeRequest<T>(
      () =>
        this.httpClient.post<T>(
          url,
          options?.body ?? {},
          httpOptions,
        ) as Observable<T>,
      url,
      'POST',
      options,
    );
  }

  PUT<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Observable<T | IResponse> {
    const httpOptions = this.gatewayHelper.buildHttpOptions(url, options);

    return this.executeRequest<T>(
      () =>
        this.httpClient.put<T>(
          url,
          options?.body ?? {},
          httpOptions,
        ) as Observable<T>,
      url,
      'PUT',
      options,
    );
  }

  PATCH<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Observable<T | IResponse> {
    const httpOptions = this.gatewayHelper.buildHttpOptions(url, options);

    return this.executeRequest<T>(
      () =>
        this.httpClient.patch<T>(
          url,
          options?.body ?? {},
          httpOptions,
        ) as Observable<T>,
      url,
      'PATCH',
      options,
    );
  }

  DELETE<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Observable<T | IResponse> {
    const method: TMethod = 'DELETE';

    const httpOptions = this.gatewayHelper.buildHttpOptions(url, options);

    return this.executeRequest<T>(
      () =>
        this.httpClient.request<T>(method, url, {
          body: options?.body ?? {},
          ...httpOptions,
        }) as Observable<T>,
      url,
      method,
      options,
    );
  }
}
