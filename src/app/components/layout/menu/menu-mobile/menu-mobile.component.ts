import { CurrentRouteService } from '@/app/service/RxJS-BehaviorSubject/current-route.service';
import path from '@/app//models/constants/path.constants';
import HotToastClass from '@/app/utils/class/notification/HotToastClass.utils';
import SweetAlertClass from '@/app/utils/class/notification/SweetAlertClass.utils';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  imports: [CommonModule, RouterModule],
})
export class MenuMobileComponent implements OnInit {
  currentRoute: string = '';

  isMenuOpen: boolean = false;

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
    private hotToast: HotToastClass
  ) {}

  ngOnInit() {
    this.onChangeCurrentRoute();
  }

  private onChangeCurrentRoute(): void {
    this.currentRouteService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoute = currentRoute;
    });
  }

  showMenu(): void {
    this.isMenuOpen = true;
  }

  hideMenu(): void {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onClickLogOut(): void {
    SweetAlertClass.MessageQuestion(
      'Confirmación',
      '¿Está seguro que desea cerrar sesión?',
      'warning'
    ).then((result) => {
      this.isMenuOpen = false;

      if (result.isConfirmed) {
        this.hotToast.infoNotification('Se ha cerrado sesión');
        this.router.navigate(['/' + path.auth.login]);
      }
    });
  }
}
