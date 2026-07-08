import { ApiResponse } from '@/shared/http-client/data-types/interfaces/http-client.interface';
import { ApiResponseNormalizerService } from '@/shared/http-client/services/api-response-normalizer.service';
import { HttpLogService } from '@/shared/http-client/services/http-log.service';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, timeout } from 'rxjs';

/**
 * 1 minuto */
const TIMEOUT_MS: number = 60000;

/**
 * 408 Request Timeout */
const TIMEOUT_STATUS: number = 408;

/**
 * aplica un tiempo maximo de expiracion de 1 minuto a cada peticion HTTP. Cuando se cumple
 * 1 minuto sin respuesta:
 * aborta la peticion,
 * imprime el detalle
 * y delega los logs en http-log.service.
 *
 * Implementado con el patron moderno de RxJS
 * `timeout({ each, with })`: el `with` emite una respuesta sintetica sin lanzar errores
 * (cumple la prohibicion de propagar errores desde los interceptors) */
export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  const normalizer = inject(ApiResponseNormalizerService);
  const httpLog = inject(HttpLogService);

  return next(req).pipe(
    timeout({
      each: TIMEOUT_MS,
      with: () => {
        // 1) abortar la peticion: timeout cancela la suscripcion al source y aborta el fetch
        // 2) mensaje de timeout
        console.error(
          '❌ [timeout.interceptor.ts] Se ha detenido la peticion HTTP porque ha demorado mas de un minuto en responder',
        );

        // 3) logs del timeout
        const normalized: ApiResponse<unknown> = normalizer.normalize(
          null,
          TIMEOUT_STATUS,
          'Request Timeout - La petición HTTP superó el tiempo máximo de 1 minuto',
        );

        httpLog.timeoutLogs(req, normalized);

        // respuesta sintetica envuelta en ApiResponse<T> (el error no se propaga al consumidor)
        return of(
          new HttpResponse({
            body: normalized,
            status: TIMEOUT_STATUS,
            url: req.url,
          }),
        );
      },
    }),
  );
};
