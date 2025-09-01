import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuDesktopComponent } from '@/app/layout/menu/menu-desktop/menu-desktop.component';
import { MenuMobileComponent } from '@/app/layout/menu/menu-mobile/menu-mobile.component';
import IMenuOptions from '@/models/interfaces/menu.interfaces';
import { HttpService } from '@/service/general-service/http.service';
import {
  sessionStorageListValue,
  sessionStorageSearch,
} from '@/utils/func/sessionStorage.utils';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import { AuthService } from '@/service/general-service/auth/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  imports: [MenuDesktopComponent, MenuMobileComponent],
})
export class MainMenuComponent implements OnInit {
  authService = inject(AuthService);
  httpService = inject(HttpService);
  hotToast = inject(HotToastClass);

  menuOptions = signal<IMenuOptions[]>([]);

  ngOnInit() {
    this.listMenu();
  }

  async listMenu(): Promise<void> {
    if (sessionStorageSearch('menu')) {
      this.menuOptions.set(sessionStorageListValue('menu'));
      return;
    }

    this.authService.listMenu().subscribe({
      next: ({ success, data }) => {
        if (success) {
          this.menuOptions.set(data);
        } else {
          this.menuOptions.set([]);
          this.hotToast.errorNotification('Al mostrar menu');
        }
      },
    });
  }
}
