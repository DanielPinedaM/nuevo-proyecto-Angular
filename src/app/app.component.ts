import { environment } from '@/environments/environment';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoaderService } from '@/app/service/RxJS-BehaviorSubject/layout/loader.service';
import {
  constImmutableProperties,
  objSessionStorage,
} from '@/app/models/constants/session-storage.constants';
import SweetAlertClass from '@/app/utils/class/notification/SweetAlertClass';
import { sessionStorageSearch } from '@/app/utils/func/sessionStorage';
import { LoaderComponent } from '@/app/components/layout/loader/loader.component';
import path from '@/app//models/constants/path.constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loader: boolean = false;

  constructor(
    private bnIdle: BnNgIdleService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.getLoader();
    this.logOutDueToInactivity();
    this.closeSessionWhenModifyingSessionStorage();
  }

  private getLoader(): void {
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

  private logOutDueToInactivity(): void {
    if (!environment.production) return;

    this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        if (sessionStorageSearch(objSessionStorage.token!)) {
          this.router.navigate(['/' + path.auth.login]);
          SweetAlertClass.MessageAlert(
            'Sesión Inactiva',
            'Su sesión ya no se encuentra activa, ingrese nuevamente',
            'info'
          );
        }
      }
    });
  }

  private closeSessionWhenModifyingSessionStorage(): void {
    const immutableProperties: string[] = constImmutableProperties;
    window.addEventListener('storage', (event: StorageEvent) => {
      const modifiedProperty: string = event.key!;
      const indexOf: number = immutableProperties.indexOf(modifiedProperty);

      if (indexOf > -1) {
        this.router.navigate(['/' + path.auth.login]);
        SweetAlertClass.MessageAlert(
          'Sesión Inactiva',
          'Su sesión ya no se encuentra activa, ingrese nuevamente',
          'info'
        );
      }
    });
  }
}
