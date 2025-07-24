import { PrimeNgModules } from '@/app/imports/import-prime-ng';
import { CurrentRouteService } from '@/app/service/RxJS-BehaviorSubject/current-route.service';
import path from '@/app//models/constants/path.constants';
import HotToastClass from '@/app/utils/class/notification/HotToastClass';
import SweetAlertClass from '@/app/utils/class/notification/SweetAlertClass';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-desktop',
  templateUrl: './menu-desktop.component.html',
  imports: [...PrimeNgModules, CommonModule, RouterModule],
})
export class MenuDesktopComponent implements OnInit {
  currentRoute: string = '';

  showText: boolean = true;

  menuOptions = [
    {
      tooltip: 'Bots',
      text: 'Bots',
      path: `/${path.home.home}/${path.home.bots}`,
    },
  ];

  constructor(
    private currentRouteService: CurrentRouteService,
    private router: Router,
    private hotToast: HotToastClass,
  ) {}

  ngOnInit() {
    this.onChangeCurrentRoute();
  }

  private onChangeCurrentRoute(): void {
    this.currentRouteService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoute = currentRoute;
    });
  }

  onClickMinimizeOrMaximizeMenu(): void {
    this.showText = !this.showText;
  }

  onClickLogOut(): void {
    SweetAlertClass.MessageQuestion(
      'Confirmación',
      '¿Está seguro que desea cerrar sesión?',
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        this.hotToast.infoNotification("Se ha cerrado sesión");
        this.router.navigate(['/' + path.auth.login]);
      }
    });
  }
}
