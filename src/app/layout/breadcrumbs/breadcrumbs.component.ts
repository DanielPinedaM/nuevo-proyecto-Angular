import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  sessionStorageListValue,
  sessionStorageSaveAndUpdate,
} from '@/utils/func/sessionStorage.utils';
import { CurrentRouteService } from '@/service/RxJS-BehaviorSubject/current-route.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  imports: [CommonModule],
})
export class BreadcrumbsComponent implements OnInit {
  currentRouteService = inject(CurrentRouteService);
  router = inject(Router);

  currentRoute: string = '';
  breadcrumbs: string[] = [];

  ngOnInit() {
    this.onChangeCurrentRoute();
  }

  private onChangeCurrentRoute(): void {
    this.currentRouteService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoute = currentRoute ?? '';

      if (
        this.currentRoute &&
        Array.isArray(this.breadcrumbs) &&
        !this.breadcrumbs.includes(this.currentRoute)
      ) {
        this.breadcrumbs.push(this.currentRoute);
        sessionStorageSaveAndUpdate('breadcrumb', this.breadcrumbs);
      }

      this.breadcrumbs = sessionStorageListValue('breadcrumb') ?? [];
    });
  }

  onClickCloseBreadcrumb(i: number): void {
    this.breadcrumbs.splice(i, 1);
    sessionStorageSaveAndUpdate('breadcrumb', this.breadcrumbs);
    const lastBreadcrumb: string | undefined = this.breadcrumbs.at(-1);

    if (lastBreadcrumb) {
      this.router.navigate(['/' + lastBreadcrumb]);
    }
  }

  onClickOpenBreadcrumb(breadcrumb: string): void {
    this.router.navigate([breadcrumb]);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
