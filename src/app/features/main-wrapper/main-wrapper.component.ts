import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { MainMenuComponent } from '@/shared/ui/menu/main-menu/main-menu.component';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  imports: [MainMenuComponent, BreadcrumbsComponent, RouterOutlet],
})
export class MainWrapperComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
