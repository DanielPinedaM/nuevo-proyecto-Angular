import { inject, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

// devuelve un string con la ruta actual q se actualiza cada vez q cambia la ruta actual (al navegar)
export class CurrentRouteService {
  private router = inject(Router);

  private currentRouteSubject = new BehaviorSubject<string>('');
  public currentRoute$ = this.currentRouteSubject.asObservable();

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.currentRouteSubject.next(this.router.url));
  }
}
