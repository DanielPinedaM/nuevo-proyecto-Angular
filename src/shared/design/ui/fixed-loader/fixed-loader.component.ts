import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-fixed-loader',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './fixed-loader.component.html',
})
export class FixedLoaderComponent {}
