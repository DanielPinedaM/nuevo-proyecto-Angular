import { FixedLoaderComponent } from '@/shared/http-client/loader/design/ui/fixed-loader/fixed-loader.component';
import { LoaderService } from '@/shared/http-client/loader/services/stores/loader.store';
import SessionStorageService from '@/shared/services/SessionStorage.service';
import ToastService from '@/shared/services/Toast.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FixedLoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  storage = inject(SessionStorageService);
  toast = inject(ToastService);
  router = inject(Router);

  private loaderService = inject(LoaderService);
  readonly getLoader = this.loaderService.getLoader;

  ngOnInit(): void {}
}
