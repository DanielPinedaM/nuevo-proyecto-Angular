import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiGatewayService } from '@/shared/api/general-api/http-gateway-observable.api';
import Storage from '@/shared/utils/class/SessionStorageClass.utils';
import HotToastClass from '@/shared/utils/class/notification/HotToastClass.utils';
import { environment } from '@/environments/environment';
import { firstValueFrom } from 'rxjs';
import { IResponse } from '@/shared/api/general-api/types/request-data.types';
import IMenuOptions from '@/shared/ui/menu/models/interfaces/menu.interfaces';
import { MenuMobileComponent } from '@/shared/ui/menu/menu-mobile/menu-mobile.component';
import { MenuDesktopComponent } from '@/shared/ui/menu/menu-desktop/menu-desktop.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  imports: [MenuDesktopComponent, MenuMobileComponent],
})
export class MainMenuComponent implements OnInit {
  storage = inject(Storage);
  http = inject(ApiGatewayService);
  hotToast = inject(HotToastClass);

  menuOptions = signal<IMenuOptions[]>([]);

  ngOnInit() {
    this.listMenu();
  }

  async listMenu(): Promise<void> {
    if (this.storage.search('menu')) {
      this.menuOptions.set(this.storage.listValue('menu'));
      return;
    }

    const { success, data }: IResponse = await firstValueFrom(
      this.http.POST(`${environment.api}`)
    );

    if (success) {
      this.menuOptions.set(data);
    } else {
      this.menuOptions.set([]);
      this.hotToast.errorNotification('Al mostrar menu');
    }
  }
}
