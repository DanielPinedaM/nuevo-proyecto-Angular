import { LoaderService } from '@/shared/http-client/loader/services/stores/loader.store';
import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

/**
 * token para desactivar el icono de loader en una peticion concreta.
 * Por defecto el loader se muestra (true) */
export const SHOW_LOADER: HttpContextToken<boolean> = new HttpContextToken<boolean>(() => true);

/**
 * contador de peticiones HTTP activas que solicitaron mostrar el loader */
let activeRequests: number = 0;

/**
 * controla el icono de carga (loader con position: fixed) del componente fixed-loader.
 * Usa un CONTADOR (no un booleano) para que dos peticiones solapadas no apaguen el loader
 * antes de tiempo: mientras el contador sea > 0 el loader permanece visible.
 *
 * FUENTE DE LA VERDAD: el contador activeRequests de este interceptor es el ÚNICO que decide
 * cuándo mostrar/ocultar el loader (responsabilidad única). El loader debe estar visible siempre
 * que haya peticiones HTTP en curso, por eso NINGÚN otro archivo debe llamar a showLoader() ni
 * hideLoader() directamente: hacerlo saltaría el contador y podría apagar el spinner mientras
 * otras peticiones siguen activas.
 *
 * Por esa razón:
 * - timeout.interceptor.ts NO llama a hideLoader() cuando expira una petición.
 *
 * - unauthenticated-error.handler.service.ts (401) NO llama a hideLoader() al redirigir al login.
 *
 * Ambos emiten/terminan su Observable y dejan que el finalize() de abajo (que los envuelve)
 * decremente el contador y oculte el loader solo cuando activeRequests llega a 0 */
export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderStore = inject(LoaderService);
  const showLoader: boolean = req.context.get(SHOW_LOADER);

  if (showLoader) {
    activeRequests++;
    loaderStore.showLoader();
  }

  return next(req).pipe(
    finalize(() => {
      if (!showLoader) return;

      activeRequests--;

      if (activeRequests <= 0) {
        activeRequests = 0;
        loaderStore.hideLoader();
      }
    }),
  );
};
