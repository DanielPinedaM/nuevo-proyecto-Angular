import { environment } from '@/environments/environment';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoaderService } from '@/shared/services/stores/loader.store';
import SessionStorageService from '@/shared/services/SessionStorage.service';
import { FixedLoaderComponent } from '@/shared/design/ui/fixed-loader/fixed-loader.component';
import ToastService from '@/shared/services/Toast.service';

const AUTH_ROUTES: string[] = [
  'iniciar-sesion',
  'recuperar-clave',
  'asignar-nueva-clave',
  'registrarme',
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FixedLoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  storage = inject(SessionStorageService);
  toast = inject(ToastService);
  bnIdle = inject(BnNgIdleService);
  router = inject(Router);
  loaderService = inject(LoaderService);

  loader = signal<boolean>(false);

  ngOnInit(): void {
    this.#getLoader();
    this.#logOutDueToInactivity();
  }

  #getLoader(): void {
    this.loaderService.getLoader().subscribe((loader: boolean) => {
      if (loader) {
        const milliseconds = 120000;

        setTimeout(() => {
          this.loader.set(false);

          console.warn(
            `⚠️ se oculto el icono de cargando despues de ${
              milliseconds / 120000
            } minutos porque una peticion HTTP tardo en responder`,
          );
        }, milliseconds);
      }

      this.loader.set(loader);
    });
  }

  #logOutDueToInactivity(): void {
    if (!environment.production) return;

    this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
      if (!isTimedOut) return;

      const isAuthRoute: boolean = AUTH_ROUTES.some((route: string) =>
        this.router.url.includes(route),
      );
      if (isAuthRoute) return;

      this.router.navigate(['/iniciar-sesion']);
      this.toast.info('Su sesión ya no se encuentra activa, ingrese nuevamente');
    });
  }
}
