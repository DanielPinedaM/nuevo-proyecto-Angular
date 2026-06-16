import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

import { TooltipModule } from 'primeng/tooltip';

import ToastUtilsService from '@/shared/utils/class/Toast.utils';

interface IMenuOptions {
  text: string;
  path: string;
  tooltip: string;
  angularMaterialIcon: string;
}

@Component({
  selector: 'app-menu-desktop',
  standalone: true,
  templateUrl: './menu-desktop.component.html',
  imports: [CommonModule, RouterModule, TooltipModule],
})
export class MenuDesktopComponent {
  readonly router = inject(Router);
  readonly toast = inject(ToastUtilsService);

  readonly showText = signal<boolean>(false);

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

  readonly menuOptions = input.required<IMenuOptions[]>();

  onClickMinimizeOrMaximizeMenu(): void {
    this.showText.update((previousValue) => !previousValue);
  }

  onClickLogOut(): void {
    this.router.navigate(['/iniciar-sesion']);
    this.toast.error('Se ha cerrado sesión');
  }
}
