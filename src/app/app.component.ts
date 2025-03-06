import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { Router } from '@angular/router';
import { LoaderService } from './service/RxJS-BehaviorSubject/layout/loader.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { sessionStorageSearch } from './utils/func/sessionStorage';
import { constImmutableProperties, objSessionStorage } from './types/constants/const-session-storage';
import path from './types/constants/cons-path';
import SweetAlertClass from './utils/class/SweetAlertClass';
import { environment } from '@/environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loader: boolean = false;

  constructor(
    private bnIdle: BnNgIdleService,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.getLoader();
    this.logOutDueToInactivity();
    this.closeSessionWhenModifyingSessionStorage();
  }

  private getLoader(): void {
    this.loaderService.getLoader().subscribe((loader: boolean) => {
      if (loader) {
        const _timeout: number =  1000 * 60;

        setTimeout(() => {
          this.loader = false;
        }, _timeout)
      }

      this.loader = loader;
    });
  }

  private logOutDueToInactivity(): void {
    if (!environment.production) return;

    this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        if (sessionStorageSearch(objSessionStorage.token!)) {
          this.router.navigate(['/' + path.login.login]);
          SweetAlertClass.MessageAlert('Sesión Inactiva', 'Su sesión ya no se encuentra activa, ingrese nuevamente', 'info');
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
        this.router.navigate(['/' + path.login.login]);
        SweetAlertClass.MessageAlert('Sesión Inactiva', 'Su sesión ya no se encuentra activa, ingrese nuevamente', 'info');
      }
    });
  }
}
