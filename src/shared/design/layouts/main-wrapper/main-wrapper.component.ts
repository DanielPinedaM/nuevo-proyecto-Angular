import { MainMenuComponent } from '@/shared/design/ui/menu/main-menu/main-menu.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  imports: [MainMenuComponent, RouterOutlet],
})
export class MainWrapperComponent implements OnInit {
  ngOnInit() {}
}
