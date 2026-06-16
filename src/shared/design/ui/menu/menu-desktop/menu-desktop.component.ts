import { CurrentRouteService } from '@/shared/services/stores/current-route.store';
import HotToastClass from '@/shared/utils/class/notification/HotToastClass.utils';
import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

interface IMenuOptions {
  text: string;
  path: string;
  tooltip: string;
  angularMaterialIcon: string;
}

@Component({
  selector: 'app-menu-desktop',
  templateUrl: './menu-desktop.component.html',
  imports: [CommonModule, RouterModule, TooltipModule],
})
export class MenuDesktopComponent implements OnInit {
  currentRouteService = inject(CurrentRouteService);
  router = inject(Router);
  hotToast = inject(HotToastClass);

  currentRoute = signal<string>('');
  showText = signal<boolean>(false);

  menuOptions = input.required<IMenuOptions[]>();

  ngOnInit() {
    this.#onChangeCurrentRoute();
  }

  #onChangeCurrentRoute(): void {
    this.currentRouteService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoute.set(currentRoute);
    });
  }

  onClickMinimizeOrMaximizeMenu(): void {
    this.showText.update((prev) => !prev);
  }

  onClickLogOut(): void {
    this.router.navigate(['/iniciar-sesion']);
    this.hotToast.errorNotification('Se ha cerrado sesión');
  }
}
