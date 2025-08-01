import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
devuelve un numero con el ancho del viewport (pantalla),
se ejecuta cada vez q cambia el ancho de la pantalla,
Ejemplo: al girar el celular */
export class ViewportWidthService {
  private viewportWidthSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(window?.innerWidth);
  public viewportWidth$: Observable<number> =
    this.viewportWidthSubject.asObservable();

  getViewportWidth = (): Observable<number> => this.viewportWidth$;

  setViewportWidth(viewportWidth: number): void {
    if (this.viewportWidthSubject.value !== viewportWidth) {
      this.viewportWidthSubject.next(viewportWidth);
    }
  }
}
