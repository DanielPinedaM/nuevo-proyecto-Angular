import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuDesktopComponent } from '@/app/layout/menu/menu-desktop/menu-desktop.component';
import { MenuMobileComponent } from '@/app/layout/menu/menu-mobile/menu-mobile.component';
import IMenuOptions from '@/models/interfaces/menu.interfaces';
import { HttpService } from '@/service/general-service/http.service';
import { environment } from '@/environments/environment';
import {
  sessionStorageListValue,
  sessionStorageSearch,
} from '@/utils/func/sessionStorage.utils';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  imports: [MenuDesktopComponent, MenuMobileComponent],
})
export class MainMenuComponent implements OnInit {
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

    const { success, data } = await this.httpService.request<IMenuOptions[]>(
      'POST',
      `${environment.api}AQUI_FALTA_ESCRIBIR_URL_DEL_ENDPOINT_DEL_MENU`
    );

    if (success) {
      this.menuOptions.set(data);
    } else {
      this.menuOptions.set([]);
      this.hotToast.errorNotification('Al mostrar menu');
    }
  }
}
