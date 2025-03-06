import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SweetAlertClass from '@/app/utils/class/SweetAlertClass';
import { CurrentRouteService } from '@/app/service/RxJS-BehaviorSubject/current-route.service';
import menuOptions from '@/app/types/constants/const-menu';
import IMenuOptions from '@/app/types/interfaces/interface-menu';
import path from '@/app/types/constants/cons-path';

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
        this.router.navigate(['/' + path.login.login]);
      }
    });
  }
}
