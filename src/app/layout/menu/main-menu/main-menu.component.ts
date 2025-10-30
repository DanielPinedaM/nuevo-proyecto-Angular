import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuDesktopComponent } from '@/app/layout/menu/menu-desktop/menu-desktop.component';
import { MenuMobileComponent } from '@/app/layout/menu/menu-mobile/menu-mobile.component';
import IMenuOptions from '@/models/interfaces/menu.interfaces';
import { HttpService } from '@/service/general-service/http-observable.service';
import Storage from '@/utils/class/SessionStorageClass.utils';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import { environment } from '@/environments/environment';
import { IResponse } from '@/service/general-service/types/request-data.types';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  imports: [MenuDesktopComponent, MenuMobileComponent],
})
export class MainMenuComponent implements OnInit {
  storage = inject(Storage);
  http = inject(HttpService);
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
