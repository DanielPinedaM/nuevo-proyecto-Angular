import { CurrentRouteService } from '@/service/RxJS-BehaviorSubject/current-route.service';
import path from '@/models/constants/path.constants';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import SweetAlertClass from '@/utils/class/notification/SweetAlertClass.utils';
import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import IMenuOptions from '@/models/interfaces/menu.interfaces';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  imports: [CommonModule, RouterModule],
})
export class MenuMobileComponent implements OnInit {
  currentRouteService = inject(CurrentRouteService);
  router = inject(Router);
  hotToast = inject(HotToastClass);

  currentRoute = signal<string>('');
  showText = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);

  menuOptions = input.required<IMenuOptions[]>();

  ngOnInit() {
    this.onChangeCurrentRoute();
  }

  private onChangeCurrentRoute(): void {
    this.currentRouteService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoute.set(currentRoute);
    });
  }

  showMenu(): void {
    this.isMenuOpen.set(true);
  }

  hideMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((prev) => !prev);
  }

  onClickLogOut(): void {
    SweetAlertClass.MessageQuestion(
      'Confirmación',
      '¿Está seguro que desea cerrar sesión?',
      'warning'
    ).then((result) => {
      this.isMenuOpen.set(false);

      if (result.isConfirmed) {
        this.hotToast.infoNotification('Se ha cerrado sesión');
        this.router.navigate(['/' + path.auth.login]);
      }
    });
  }
}
