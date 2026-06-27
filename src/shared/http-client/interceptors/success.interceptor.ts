import { ApiResponseNormalizerService } from '@/shared/http-client/services/api-response-normalizer.service';
import { HttpLogService } from '@/shared/http-client/services/http-log.service';
import { IResponse } from '@/shared/http-response/data-types/interfaces/http-response.interface';
import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';

/**
normaliza las respuestas HTTP EXITOSAS al contrato IResponse<T>, delegando la
validacion/normalizacion en ApiResponseNormalizerService
(no se repite esa logica aqui / Responsabilidad unica) */
export const successInterceptor: HttpInterceptorFn = (req, next) => {
  const normalizer = inject(ApiResponseNormalizerService);
  const httpLog = inject(HttpLogService);

  return next(req).pipe(
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const normalized: IResponse<unknown> = normalizer.normalize(event.body, event.status);

        httpLog.successLogs(req, normalized);

        // se reemplaza el body por la respuesta ya envuelta en IResponse<T>
        return event.clone({ body: normalized });
      }

      return event;
    }),
  );
};
