import path from '@/models/constants/path.constants';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-404-non-existent-path',
  templateUrl: './error-404-non-existent-path.component.html',
})
export class Error404NonExistentPathComponent {
  router = inject(Router);

  currentRoute: string = '';

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

  onClickLogout = (): Promise<boolean> =>
    this.router.navigate(['/' + path.auth.login]);
}
