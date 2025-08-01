import { objSessionStorage } from '@/app/models/constants/session-storage.constants';
import { sessionStorageSearch } from '@/app/utils/func/sessionStorage.utils';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import path from '@/app//models/constants/path.constants';
import { CurrentRouteService } from '@/app/service/RxJS-BehaviorSubject/current-route.service';

/**
Proteccion de rutas */
export const AuthGuard: CanActivateFn = (route, state) => {
  return true; // borrar esto y des-comentar las siguientes lineas de codigo para activar la proteccion de rutas

  /*
  const router = inject(Router);

  const userIsAuth: boolean = sessionStorageSearch(objSessionStorage.token!);

  if (!userIsAuth) {
    router.navigate(['/' + path.auth.login]);
  }

  return userIsAuth;
  */
};
