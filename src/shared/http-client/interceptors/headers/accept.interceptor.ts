import { HttpInterceptorFn } from '@angular/common/http';

/**
 * asigna dinámicamente el header Accept a las peticiones HTTP, de forma agnóstica al dominio.
 * Declara explícitamente que se espera una respuesta JSON (Angular no siempre setea Accept,
 * depende del responseType).
 *
 * NO toca el header (lo deja pasar) cuando:
 * 1) la petición ya definió su propio Accept (se respeta),
 * 2) el responseType NO es 'json' (blob | arraybuffer | text): evita romper descargas de
 *    archivos y respuestas no-JSON.
 *
 * En cualquier otro caso asigna application/json. */
export const acceptInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('Accept') || req.responseType !== 'json') return next(req);

  return next(req.clone({ setHeaders: { Accept: 'application/json' } }));
};
