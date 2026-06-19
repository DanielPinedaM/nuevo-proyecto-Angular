import { Component, inject, OnInit, signal } from '@angular/core';
import Storage from '@/shared/utils/class/SessionStorageClass.utils';
import ToastUtilsService from '@/shared/utils/class/Toast.utils';
import { environment } from '@/environments/environment';
import { firstValueFrom } from 'rxjs';
import { ApiGatewayService } from '@/shared/services/api/http-client/http-gateway-observable.api';
import { IResponse } from '@/shared/services/api/http-client/types/request-data.types';
import { MenuDesktopComponent } from '@/shared/design/ui/menu/menu-desktop/menu-desktop.component';
import { MenuMobileComponent } from '@/shared/design/ui/menu/menu-mobile/menu-mobile.component';

interface IMenuOptions {
  text: string;
  path: string;
  tooltip: string;
  angularMaterialIcon: string;
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  imports: [MenuDesktopComponent, MenuMobileComponent],
})
export class MainMenuComponent implements OnInit {
  storage = inject(Storage);
  http = inject(ApiGatewayService);
  toast = inject(ToastUtilsService);

  menuOptions = signal<IMenuOptions[]>([]);

  ngOnInit() {
    this.listMenu();
  }

  async listMenu(): Promise<void> {
    if (this.storage.search('menu')) {
      this.menuOptions.set(this.storage.listValue('menu'));
      return;
    }

    const { success, data } = await firstValueFrom(
      this.http.POST(`${environment.api}`),
    );

    if (success) {
      this.menuOptions.set(data);
    } else {
      this.menuOptions.set([]);
      this.toast.error('Al mostrar menu');
    }
  }
}
