import { LoaderService } from '@/shared/http-client/loader/services/stores/loader.store';
import { ApiResponseNormalizerService } from '@/shared/http-client/services/api-response-normalizer.service';
import { HttpLogService } from '@/shared/http-client/services/http-log.service';
import { IResponse } from '@/shared/http-response/data-types/interfaces/http-response.interface';
import ToastService from '@/shared/services/Toast.service';
import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, Injector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

/**
 * normaliza las respuestas HTTP ERRONEAS al contrato IResponse<T>, delegando la
 * validacion/normalizacion en ApiResponseNormalizerService. Contiene acciones de errores
 * generales/globales (401/403/404/5xx), NO logica de negocio de features.
 * PROHIBIDO propagar el error con throw: el error se "traga" emitiendo una respuesta sintetica. */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const normalizer = inject(ApiResponseNormalizerService);
  const httpLog = inject(HttpLogService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const status: number =
        typeof error?.error?.status === 'number' ? error.error.status : error.status;

      // acciones globales de error (401/403/404/5xx).
      // se ejecuta dentro de runInInjectionContext porque catchError corre de forma asincrona
      // (fuera del injection context) y handleGlobalError usa inject() internamente
      runInInjectionContext(injector, () => handleGlobalError(status, req.url));

      // normalizacion delegada al intermediario (mismo contrato que el exito)
      const normalized: IResponse<unknown> = normalizer.normalize(
        error.error,
        status ?? 500,
        error.message ?? 'no se pudo capturar el mensaje de error de la API',
      );

      httpLog.errorLogs(req, normalized);

      // el error NO se propaga al consumidor: se emite una respuesta sintetica envuelta en IResponse<T>
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

/**
 * manejo global de errores HTTP. Adaptado de gateway-helper.service.ts (sin importar el service).
 * Usa inject() directamente (sin recibir router, toast ni loaderStore por parametro); por eso debe
 * invocarse dentro de un injection context (runInInjectionContext). */
function handleGlobalError(status: number, url: string): void {
  const router = inject(Router);
  const toast = inject(ToastService);
  const loaderStore = inject(LoaderService);

  if (!status) return;

  if (status === 401) {
    console.error(
      '❌ error.interceptor.ts - Error 401: unauthenticated',
      '\nDetalle: El usuario no está autenticado o la sesión ha expirado',
      '\nAcción: Re-dirigir al usuario a la página de inicio de sesión',
      '\nURL solicitada: ',
      url,
    );

    // re-dirigir a /iniciar-sesion cuando el status de la respuesta sea 401
    router.navigate(['/iniciar-sesion']);
    loaderStore.hideLoader();

    if (!pathnameIsLogin()) {
      toast.info('Inicie sesión para continuar');
    }
  } else if (status === 403) {
    console.error(
      '❌ error.interceptor.ts - Error 403: Forbidden',
      '\nDetalle: El usuario está autenticado pero no tiene permisos para acceder al recurso',
      "\nAcción: Mostrar un mensaje de 'acceso denegado' y re-dirigir a la pagina anterior del historial",
      '\nURL solicitada:',
      url,
    );

    // devolverme a la web anterior en el historial cuando el status sea 403
    returnToBrowserHistory();

    toast.info('Acceso denegado, no tiene permisos para realizar esta acción');
  } else if (status === 404) {
    console.error(
      `❌ error.interceptor.ts - error 404: Not Found - endpoint no encontrado, la URL solicitada "${url}" NO existe en el servidor`,
    );

    toast.error('Ha ocurrido un error, por favor comuniquese con el administrador del sistema');
  } else if (status >= 500) {
    console.error(`❌ error.interceptor.ts - error en el servidor en la URL ${url}`);

    toast.error(
      'Ha ocurrido un error, intentalo de nuevo mas tarde, estamos trabajando para solucionarlo',
    );
  }
}

function pathnameIsLogin(): boolean {
  return window.location.pathname === '/iniciar-sesion';
}

function redirectToLogin(): void {
  if (!pathnameIsLogin()) {
    window.location.href = '/iniciar-sesion';
  }
}

function returnToBrowserHistory(): void {
  if (window.history.length > 1) {
    window.history.go(-1);
  } else {
    redirectToLogin();
  }
}
