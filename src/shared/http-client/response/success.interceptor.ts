import {
  API_RESPONSE_KEYS,
  FALLBACK_MESSAGE,
} from '@/shared/http-client/data-types/constants/http-client.const';
import { ApiResponse } from '@/shared/http-client/data-types/interfaces/http-client.interface';
import { ApiResponseNormalizerService } from '@/shared/http-client/services/api-response-normalizer.service';
import { HttpClientHelpersService } from '@/shared/http-client/services/http-client-helpers.service';
import { HttpLogService } from '@/shared/http-client/services/http-log.service';
import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';

/**
 * normaliza las respuestas HTTP EXITOSAS al contrato ApiResponse<T>, delegando la
 * validacion/normalizacion en ApiResponseNormalizerService y la validacion del
 * http status real en HttpClientHelpersService.getRealHttpStatus */
export const successInterceptor: HttpInterceptorFn = (req, next) => {
  const httpClientHelpers = inject(HttpClientHelpersService);
  const normalizer = inject(ApiResponseNormalizerService);
  const httpLog = inject(HttpLogService);

  return next(req).pipe(
    map((event: HttpEvent<unknown>) => {
      if (!(event instanceof HttpResponse)) return event;

      // event.body es unknown, se MANTIENE el tipado estricto en una constante
      // aqui NO hay conversion, Angular ya tipa event.body como unknown, a diferencia de error.interceptor
      const successBody: unknown = event.body;

      // status declarado en el body, SOLO si el backend respondio un objeto literal {}
      const apiStatus: unknown = httpClientHelpers.isLiteralObject(successBody)
        ? successBody?.[API_RESPONSE_KEYS.status]
        : undefined;

      // message declarado en el body, SOLO si el backend respondio un objeto literal {}
      const apiMessage: unknown = httpClientHelpers.isLiteralObject(successBody)
        ? successBody?.[API_RESPONSE_KEYS.message]
        : undefined;

      const httpStatus: number = event.status;

      const realStatus: number = httpClientHelpers.getRealHttpStatus(apiStatus, httpStatus);

      // normalizacion delegada al intermediario (mismo contrato que el error.interceptor)
      const normalized: ApiResponse<unknown> = normalizer.normalize(
        successBody,
        realStatus,
        typeof apiMessage === 'string' ? apiMessage : FALLBACK_MESSAGE,
      );

      httpLog.successLogs(req, normalized);

      // se reemplaza el body por la respuesta ya envuelta en ApiResponse<T>
      return event.clone({ body: normalized });
    }),
  );
};
