import { Service } from '@angular/core';

/**
 * helpers de navegación compartidos entre los handlers de error (pathnameIsLogin,
 * redirectToLogin, returnToBrowserHistory). NO contiene lógica de negocio: solo
 * utilidades de redirección e historial del navegador. */
@Service()
export class ErrorHandlerHelperService {
  /**
   * ¿la URL actual del navegador es la página de inicio de sesión? */
  pathnameIsLogin(): boolean {
    return window.location.pathname === '/iniciar-sesion';
  }

  /**
   * redirige a /iniciar-sesion SOLO si el usuario no está ya en esa página */
  redirectToLogin(): void {
    if (!this.pathnameIsLogin()) {
      window.location.href = '/iniciar-sesion';
    }
  }

  /**
   * vuelve a la página anterior del historial; si no hay historial previo, redirige al login */
  returnToBrowserHistory(): void {
    if (window.history.length > 1) {
      window.history.go(-1);
    } else {
      this.redirectToLogin();
    }
  }
}
