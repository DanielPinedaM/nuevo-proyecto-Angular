import { environment } from '@/environments/environment';
import { HttpInterceptorFn } from '@angular/common/http';

const URLS_WITHOUT_CREDENTIALS: readonly string[] = [
  `${environment.api}login`,
  `${environment.api}register`,
  `${environment.api}recoverPassword`,
  `${environment.api}assignPassword`,
];

/**
 * agrega withCredentials a cada peticion HTTP de forma centralizada, evitando tener que escribir
 * { withCredentials: true } o { withCredentials: false } en cada llamada a la API.
 * URLS_WITHOUT_CREDENTIALS contiene los endpoints a los que NO se les envia la cookie HttpOnly
 * (withCredentials: false), por ejemplo, en las peticiones donde el usuario aun NO ha iniciado sesion.
 *
 * Todas las demas peticiones si envian la cookie HttpOnly (withCredentials: true) */
export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  /** ¿la URL esta en URLS_WITHOUT_CREDENTIALS? -> NO enviar la cookie HttpOnly */
  const isWithoutCredentials: boolean = URLS_WITHOUT_CREDENTIALS.includes(req.url);

  if (isWithoutCredentials) return next(req.clone({ withCredentials: false }));

  return next(req.clone({ withCredentials: true }));
};
