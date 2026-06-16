import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import ToastUtilsService from '@/shared/utils/class/Toast.utils';

interface IMenuOptions {
  text: string;
  path: string;
  tooltip: string;
  angularMaterialIcon: string;
}

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  templateUrl: './menu-mobile.component.html',
  imports: [CommonModule, RouterModule],
})
export class MenuMobileComponent {
  readonly router = inject(Router);
  readonly toast = inject(ToastUtilsService);

  readonly menuOptions = input.required<IMenuOptions[]>();

  readonly showText = signal<boolean>(false);
  readonly isMenuOpen = signal<boolean>(false);

  readonly currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    {
      initialValue: this.router.url,
    },
  );

  showMenu(): void {
    this.isMenuOpen.set(true);
  }

  hideMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((previousValue) => !previousValue);
  }

  onClickLogOut(): void {
    this.router.navigate(['/iniciar-sesion']);
    this.toast.info('Se ha cerrado sesión');
  }
}
