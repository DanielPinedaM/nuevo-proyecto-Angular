import { API_RESPONSE_KEYS } from '@/shared/http-client/data-types/constants/http-client.const';
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
      if (event instanceof HttpResponse) {
        const status: number = httpClientHelpers.getRealHttpStatus(
          httpClientHelpers.isLiteralObject(event.body)
            ? event.body[API_RESPONSE_KEYS.status]
            : undefined,
          event.status,
        );

        const normalized: ApiResponse<unknown> = normalizer.normalize(event.body, status);

        httpLog.successLogs(req, normalized);

        // se reemplaza el body por la respuesta ya envuelta en ApiResponse<T>
        return event.clone({ body: normalized });
      }

      return event;
    }),
  );
};
