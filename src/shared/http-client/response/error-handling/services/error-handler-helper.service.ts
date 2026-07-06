import { Location } from '@angular/common';
import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';

/**
 * helpers de navegación compartidos entre los handlers de error.
 * NO contiene lógica de negocio:
 * solo utilidades de redirección e historial del navegador. */
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
   * vuelve a la página anterior del historial; si no hay historial previo, redirige al login.
   * window.history.length se mantiene: ni Location ni PlatformLocation exponen el conteo del
   * historial, y esta prohibido inyectar window para resolverlo */
  returnToBrowserHistory(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.redirectToLogin();
    }
  }
}
