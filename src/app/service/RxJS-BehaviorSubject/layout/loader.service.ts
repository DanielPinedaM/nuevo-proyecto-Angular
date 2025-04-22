/**
ocultar y mostrar loader global en todos los componentes */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loader$: Observable<boolean> = this.loaderSubject.asObservable();

  getLoader = (): Observable<boolean> => this.loader$;

  setLoader = (loader: boolean): void => this.loaderSubject.next(loader);
}
