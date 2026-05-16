import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-404-not-found',
  templateUrl: './not-found-404.component.html',
})
export class NotFound404Component implements OnInit {
  router = inject(Router);

  currentRoute = signal<string>('');

  ngOnInit() {
    this.currentRoute.set(this.router.url);
  }

  onClickLogout = (): Promise<boolean> =>
    this.router.navigate(['/iniciar-sesion']);
}
