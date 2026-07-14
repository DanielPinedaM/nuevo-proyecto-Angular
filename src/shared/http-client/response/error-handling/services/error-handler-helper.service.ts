import { Location } from '@angular/common';
import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';

/**
 * helpers compartidos entre los handlers de error y el error.interceptor.
 * NO contiene lógica de negocio:
 * solo utilidades de redirección, historial del navegador y http status. */
@Service()
export class ErrorHandlerHelperService {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  /**
   * ¿la URL actual del navegador es la página de inicio de sesión? */
  pathnameIsLogin(): boolean {
    return this.location.path() === '/iniciar-sesion';
  }

  /**
   * redirige a /iniciar-sesion SOLO si el usuario no está ya en esa página */
  redirectToLogin(): void {
    if (!this.pathnameIsLogin()) {
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  /**
   * devuelve el http status error real de una petición HTTP fallida.
   *
   * - `apiStatus`: es `error?.error?.[API_RESPONSE_KEYS.status]`. `error.error` es el body
   *   crudo de la respuesta fallida (tipado `any` en `HttpErrorResponse`); esta key solo
   *   existe si el backend devolvió un JSON que sigue el contrato `ApiResponse<T>`.
   *   Se usa ÚNICAMENTE para advertir en consola cuando no coincide con `httpStatus`,
   *   NUNCA se retorna.
   *
   * - `httpStatus`: es `error.status`, propiedad propia y tipada de `HttpErrorResponse`
   *   (`status: number`) que refleja el código HTTP REAL de la respuesta (404, 500, etc.),
   *   capturado directamente por `HttpClient`. NO pertenece al contrato `ApiResponse<T>`.
   *   SIEMPRE es el valor de retorno. */
  getRealHttpStatus(apiStatus: unknown, httpStatus: number): number {
    if (typeof apiStatus === 'number' && apiStatus !== httpStatus) {
      console.error('❌ error de backend (NO de frontend): el status declarado en el body de la API (apiStatus) no coincide con el http status real de la respuesta (httpStatus)', {
        apiStatus,
        httpStatus,
      });
    }

    return httpStatus;
  }

  /**
   * vuelve a la página anterior del historial; si no hay historial previo, redirige al login */
  returnToBrowserHistory(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.redirectToLogin();
    }
  }
}
