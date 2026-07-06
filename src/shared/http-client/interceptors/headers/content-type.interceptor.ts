import { HttpClientHelpersService } from '@/shared/http-client/services/http-client-helpers.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

/**
 * asigna dinámicamente el header Content-Type a las peticiones HTTP, de forma agnóstica al dominio.
 *
 * NO toca el header (deja que el navegador lo resuelva) cuando:
 * 1) la petición no tiene body (GET/DELETE, etc.),
 * 2) el body es un archivo/FormData/Blob/ArrayBuffer (isFile): el navegador debe setear
 *    el Content-Type con su boundary, forzarlo a mano rompería la subida de archivos,
 * 3) la petición ya definió su propio Content-Type (se respeta).
 *
 * En cualquier otro caso asigna application/json. */
export const contentTypeInterceptor: HttpInterceptorFn = (req, next) => {
  const helper = inject(HttpClientHelpersService);

  if (!req.body || helper.isFile(req.body) || req.headers.has('Content-Type')) return next(req);

  return next(req.clone({ setHeaders: { 'Content-Type': 'application/json' } }));
};
