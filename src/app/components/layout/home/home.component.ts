import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '@/app/components/layout/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '@/app/components/layout/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [MenuComponent, BreadcrumbsComponent, RouterOutlet],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
