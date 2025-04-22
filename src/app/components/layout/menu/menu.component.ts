import { CurrentRouteService } from '@/app/service/RxJS-BehaviorSubject/current-route.service';
import path from '@/app/types/constants/cons-path';
import menuOptions from '@/app/types/constants/const-menu';
import IMenuOptions from '@/app/types/interfaces/interface-menu';
import SweetAlertClass from '@/app/utils/class/notification/SweetAlertClass';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  menuOptions: IMenuOptions[] = menuOptions;

  currentRoute: string = '';

  constructor(
    private currentRouteService: CurrentRouteService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.onChangeCurrentRoute();
  }

  private onChangeCurrentRoute(): void {
    this.currentRouteService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoute = currentRoute;
    });
  }

  onClickLogOut(): void {
    SweetAlertClass.MessageQuestion(
      'Confirmación',
      '¿Está seguro que desea cerrar sesión?',
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/' + path.auth.login]);
      }
    });
  }
}
