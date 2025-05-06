import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '@/app/components/layout/breadcrumbs/breadcrumbs.component';
import { MainMenuComponent } from '@/app/components/layout/menu/main-menu/main-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [MainMenuComponent, BreadcrumbsComponent, RouterOutlet],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
