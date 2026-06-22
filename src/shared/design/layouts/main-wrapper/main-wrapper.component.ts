import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from '@/shared/design/ui/menu/main-menu/main-menu.component';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MainMenuComponent, RouterOutlet],
})
export class MainWrapperComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
