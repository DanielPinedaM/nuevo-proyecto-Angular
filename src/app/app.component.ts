import { environment } from '@/environments/environment';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoaderService } from '@/shared/service/RxJS-BehaviorSubject/layout/loader.service';
import SweetAlertClass from '@/shared/utils/class/notification/SweetAlertClass.utils';
import { LoaderComponent } from '@/app/layout/loader/loader.component';
import Storage from '@/shared/utils/class/SessionStorageClass.utils';
import { CurrentRouteService } from '@/shared/service/RxJS-BehaviorSubject/current-route.service';
import { constImmutableProperties } from '@/shared/models/constants/session-storage.const';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  storage = inject(Storage);
  sweetAlertClass = inject(SweetAlertClass);
  bnIdle = inject(BnNgIdleService);
  router = inject(Router);
  loaderService = inject(LoaderService);
  currentRouteService = inject(CurrentRouteService);

  currentRoute = signal<string>('');
  loader: boolean = false;

  ngOnInit(): void {
    this.#getLoader();

    this.#logOutDueToInactivity();
    this.#closeSessionWhenModifyingSessionStorage();
  }

  #getLoader(): void {
    this.loaderService.getLoader().subscribe((loader: boolean) => {
      if (loader) {
        const milliseconds: number = 120000;

        setTimeout(() => {
          this.loader = false;
          console.warn(
            `⚠️ se oculto el icono de cargando despues de ${
              milliseconds / 120000
            } minutos porque una peticion HTTP tardo en responder`
          );
        }, milliseconds);
      }

      this.loader = loader;
    });
  }

  #logOutDueToInactivity(): void {
    if (!environment.production) return;

    this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
      if (!isTimedOut) return;
      if (!this.router.url.includes('/inicio/')) return;

      this.router.navigate(['/autenticacion/iniciar-sesion']);
      this.sweetAlertClass.messageAlert(
        'Sesión Inactiva',
        'Su sesión ya no se encuentra activa, ingrese nuevamente',
        'info'
      );
    });
  }

  #closeSessionWhenModifyingSessionStorage(): void {
    const immutableProperties: string[] = constImmutableProperties;
    window.addEventListener('storage', (event: StorageEvent) => {
      const modifiedProperty: string = event.key!;
      const indexOf: number = immutableProperties.indexOf(modifiedProperty);

      if (indexOf > -1) {
        this.router.navigate(['/autenticacion/iniciar-sesion']);
        this.sweetAlertClass.messageAlert(
          'Sesión Inactiva',
          'Su sesión ya no se encuentra activa, ingrese nuevamente',
          'info'
        );
      }
    });
  }
}
