import { PrimeNgModules } from '@/imports/import-prime-ng';
import { CurrentRouteService } from '@/service/RxJS-BehaviorSubject/current-route.service';
import path from '@/models/constants/path.constants';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import SweetAlertClass from '@/utils/class/notification/SweetAlertClass.utils';
import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import IMenuOptions from '@/models/interfaces/menu.interfaces';

@Component({
  selector: 'app-menu-desktop',
  templateUrl: './menu-desktop.component.html',
  imports: [...PrimeNgModules, CommonModule, RouterModule],
})
export class MenuDesktopComponent implements OnInit {
  currentRouteService = inject(CurrentRouteService);
  router = inject(Router);
  hotToast = inject(HotToastClass);

  currentRoute = signal<string>('');
  showText = signal<boolean>(false);

  menuOptions = input.required<IMenuOptions[]>();

  ngOnInit() {
    this.onChangeCurrentRoute();
  }

  private onChangeCurrentRoute(): void {
    this.currentRouteService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoute.set(currentRoute);
    });
  }

  onClickMinimizeOrMaximizeMenu(): void {
    this.showText.update((prev) => !prev);
  }

  onClickLogOut(): void {
    SweetAlertClass.MessageQuestion(
      'Confirmación',
      '¿Está seguro que desea cerrar sesión?',
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        this.hotToast.infoNotification('Se ha cerrado sesión');
        this.router.navigate(['/' + path.auth.login]);
      }
    });
  }
}
