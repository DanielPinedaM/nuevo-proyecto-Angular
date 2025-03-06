import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [MenuComponent, HeaderComponent, RouterOutlet],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
