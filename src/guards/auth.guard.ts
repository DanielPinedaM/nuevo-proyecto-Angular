import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import path from '@/models/constants/path.const';

/**
proteccion de rutas */
export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // 🔥 dato quemado
  const userIsAuth: boolean = true;

  if (!userIsAuth) router.navigate(['/' + path.auth.login]);

  return userIsAuth;
};
