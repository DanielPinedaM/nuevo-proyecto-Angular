import { PrimeNgModules } from '@/imports/import-prime-ng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  imports: [...PrimeNgModules],
})
export class BotsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
