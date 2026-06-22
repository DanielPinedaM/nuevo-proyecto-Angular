import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterOutlet],
})
export class MainAuthComponent {}
