import ToastService from '@/shared/services/Toast.service';
import { inject, Service } from '@angular/core';

/**
 * maneja los status >= 500 (errores del servidor).
 * Loguea en consola y notifica un error genérico. */
@Service()
export class ServerErrorHandlerService {
  private readonly toast = inject(ToastService);

  /**
   * ejecuta las acciones globales para los status >= 500 */
  handle(url: string): void {
    console.error(`❌ server-error.handler.service.ts - error en el servidor en la URL ${url}`);

    this.toast.error(
      'Ha ocurrido un error, intentalo de nuevo mas tarde, estamos trabajando para solucionarlo',
    );
  }
}
