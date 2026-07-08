import { ApiResponse } from '@/shared/http-client/data-types/interfaces/http-client.interface';
import { GlobalErrorHandlerService } from '@/shared/http-client/response/error-handling/services/global-error-handler.service';
import { ApiResponseNormalizerService } from '@/shared/http-client/services/api-response-normalizer.service';
import { HttpLogService } from '@/shared/http-client/services/http-log.service';
import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

/**
 * normaliza las respuestas HTTP ERRONEAS al contrato ApiResponse<T>, delegando la
 * validacion/normalizacion en ApiResponseNormalizerService y el manejo global de
 * errores (401/403/404/5xx) en GlobalErrorHandlerService.
 * NO contiene logica de negocio de features */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const globalErrorHandler = inject(GlobalErrorHandlerService);
  const normalizer = inject(ApiResponseNormalizerService);
  const httpLog = inject(HttpLogService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const status: number =
        typeof error?.error?.status === 'number' ? error.error.status : error.status;

      // acciones globales de error (401/403/404/5xx) delegadas al orquestador
      globalErrorHandler.handle(status, req.url);

      // normalizacion delegada al intermediario (mismo contrato que el exito)
      const normalized: ApiResponse<unknown> = normalizer.normalize(
        error.error,
        status ?? 500,
        error?.message ?? 'no se pudo capturar el mensaje de error de la API',
      );

      httpLog.errorLogs(req, normalized);

      /**
       * esto NO es un bug, es intencional para estandarizar respuesta de APIs.
       *
       * El error se "traga", NUNCA se propaga con throw ni llega al consumidor;
       * en su lugar, se emite una respuesta sintetica envuelta en ApiResponse<T> mediante of(...)
       *
       * Esto significa que:
       * 1) Las peticiones HTTP erroneas NUNCA llegaran al bloque catch
       *
       * 2) NO necesitas envolver el consumo de la API en un try/catch
       *
       * SOLUCION: validar con response.success cuando la peticion HTTP es exitosa y erronea
       *
       * Ejemplo basico de consumo de API con async/await y firstValueFrom:
       *
       *   import { environment } from '@/environments/environment';
       *
       *   async getBots(): Promise<void> {
       *     const { success, data } = await firstValueFrom(
       *       this.http.get<ApiResponse<Bot[]>>(`${environment.api}bots`),
       *     );
       *
       *     // success === false -> el interceptor ya notifico el error globalmente
       *     if (!success) return;
       *
       *     // success === true -> usar data con seguridad
       *     this.bots.set(data);
       *   } */
      return of(
        new HttpResponse({
          body: normalized,
          status: status ?? 500,
          url: req.url,
        }),
      );
    }),
  );
};
