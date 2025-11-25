import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRouteService } from '@/shared/service/RxJS-BehaviorSubject/current-route.service';
import Storage from '@/shared/utils/class/SessionStorageClass.utils';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  imports: [CommonModule],
})
export class BreadcrumbsComponent implements OnInit {
  storage = inject(Storage);
  currentRouteService = inject(CurrentRouteService);
  router = inject(Router);

  currentRoute = signal<string>('');
  breadcrumbs: string[] = [];

  ngOnInit() {
    this.#onChangeCurrentRoute();
  }

  #onChangeCurrentRoute(): void {
    this.currentRouteService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoute.set(currentRoute ?? '');

      if (
        this.currentRoute() &&
        Array.isArray(this.breadcrumbs) &&
        !this.breadcrumbs.includes(this.currentRoute())
      ) {
        this.breadcrumbs.push(this.currentRoute());
        this.storage.saveAndUpdate('breadcrumb', this.breadcrumbs);
      }

      this.breadcrumbs = this.storage.listValue('breadcrumb') ?? [];
    });
  }

  onClickCloseBreadcrumb(i: number): void {
    this.breadcrumbs.splice(i, 1);
    this.storage.saveAndUpdate('breadcrumb', this.breadcrumbs);
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
