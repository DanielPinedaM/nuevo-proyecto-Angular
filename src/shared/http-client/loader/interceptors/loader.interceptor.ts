import { LoaderService } from '@/shared/http-client/loader/services/stores/loader.store';
import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

/**
token para desactivar el icono de loader en una peticion concreta.
Por defecto el loader se muestra (true) */
export const SHOW_LOADER: HttpContextToken<boolean> = new HttpContextToken<boolean>(() => true);

/**
contador de peticiones HTTP activas que solicitaron mostrar el loader */
let activeRequests: number = 0;

/**
controla el icono de carga (loader con position: fixed) del componente fixed-loader.
Usa un CONTADOR (no un booleano) para que dos peticiones solapadas no apaguen el loader
antes de tiempo: mientras el contador sea > 0 el loader permanece visible. */
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
