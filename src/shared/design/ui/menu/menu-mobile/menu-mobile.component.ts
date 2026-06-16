import { CurrentRouteService } from '@/shared/services/stores/current-route.store';
import ToastUtilsService from '@/shared/utils/class/Toast.utils';
import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface IMenuOptions {
  text: string;
  path: string;
  tooltip: string;
  angularMaterialIcon: string;
}

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  imports: [CommonModule, RouterModule],
})
export class MenuMobileComponent implements OnInit {
  currentRouteService = inject(CurrentRouteService);
  router = inject(Router);
  toast = inject(ToastUtilsService);

  currentRoute = signal<string>('');
  showText = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);

  menuOptions = input.required<IMenuOptions[]>();

  ngOnInit() {
    this.#onChangeCurrentRoute();
  }

  #onChangeCurrentRoute(): void {
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
    this.router.navigate(['/iniciar-sesion']);
    this.toast.info('Se ha cerrado sesión');
  }
}
