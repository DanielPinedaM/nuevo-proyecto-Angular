import { environment } from '@/environments/environment';
import { HttpInterceptorFn } from '@angular/common/http';

/**
 * URLs de los endpoints de autenticacion a los que NO se les envia la cookie HttpOnly
 * (withCredentials: false), porque son peticiones donde el usuario aun NO ha iniciado sesion.
 * El resto de peticiones SI envian la cookie HttpOnly (withCredentials: true). */
const URLS_WITHOUT_CREDENTIALS: readonly string[] = [
  `${environment.api}login`,
  `${environment.api}register`,
  `${environment.api}recoverPassword`,
  `${environment.api}assignPassword`,
];

/**
 * agrega withCredentials a cada peticion HTTP de forma centralizada, evitando tener que escribir
 * { withCredentials: true } o { withCredentials: false } en cada llamada a la API.
 * Los endpoints de autenticacion (URLS_WITHOUT_CREDENTIALS) NO reciben la cookie HttpOnly;
 * todas las demas peticiones si la envian. */
export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // ¿la URL pertenece al array de rutas de autenticacion (sin cookie)?
  const isAuthEndpoint: boolean = URLS_WITHOUT_CREDENTIALS.includes(req.url);

  // ¿debe enviarse la cookie HttpOnly? -> NO en endpoints que estan en URLS_WITHOUT_CREDENTIALS
  if (isAuthEndpoint) return next(req.clone({ withCredentials: false }));

  return next(req.clone({ withCredentials: true }));
};
