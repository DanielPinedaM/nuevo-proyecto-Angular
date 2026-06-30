import { environment } from '@/environments/environment';
import { FixedLoaderComponent } from '@/shared/http-client/loader/design/ui/fixed-loader/fixed-loader.component';
import { LoaderService } from '@/shared/http-client/loader/services/stores/loader.store';
import SessionStorageService from '@/shared/services/SessionStorage.service';
import ToastService from '@/shared/services/Toast.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

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
  private loaderService = inject(LoaderService);

  // estado global del loader; lectura reactiva (signal) en la plantilla
  readonly getLoader = this.loaderService.getLoader;

  ngOnInit(): void {
    this.#logOutDueToInactivity();
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
