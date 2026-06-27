import { Service, signal } from '@angular/core';

/**
 * estado global con signals para ocultar y mostrar el icono de "cargando" en todos los componentes */
@Service()
export class LoaderService {
  /**
   * estado vivo del loader (signal interno del store) */
  private readonly loader = signal<boolean>(false);

  /**
   * acceso de lectura: devuelve el booleano con el estado actual del loader */
  readonly getLoader = this.loader.asReadonly();

  /**
   * mostrar el icono de cargando */
  showLoader = (): void => this.loader.set(true);

  /**
   * ocultar el icono de cargando */
  hideLoader = (): void => this.loader.set(false);
}
