import ToastService from '@/shared/services/Toast.service';
import { inject, Service } from '@angular/core';

/**
 * maneja el status 404 (not found): el endpoint solicitado no existe en el servidor.
 * Loguea en consola y notifica un error genérico. */
@Service()
export class NotFoundErrorHandlerService {
  private readonly toast = inject(ToastService);

  /**
   * ejecuta las acciones globales para el status 404 */
  handle(url: string): void {
    console.error('❌ [not-found-error.handler.service.ts] error: ', {
      status: 'Error 404: not found',
      detail: `endpoint no encontrado, la URL solicitada "${url}" NO existe en el servidor`,
      action: "Mostrar toast 'Ha ocurrido un error...'",
      url: url,
    });

    this.toast.error(
      'Ha ocurrido un error, por favor comuniquese con el administrador del sistema',
    );
  }
}
