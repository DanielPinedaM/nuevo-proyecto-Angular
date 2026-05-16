import { Routes } from '@angular/router';
import { AuthGuard } from '@/shared/guards/auth.guard';

// #region - error 404 ruta inexistente
import { NotFound404Component } from '@/app/not-found-404/not-found-404.component';
// #endregion

// #region - contenedor principal de paginas despues de loguearse
import { MainWrapperComponent } from '@/app/home/main-wrapper/main-wrapper.component';
// #endregion

// #region autenticacion
import { MainAuthComponent } from '@/app/auth/main-auth/main-auth.component';
import { LoginComponent } from '@/app/auth/login/login.component';
import { RecoverPasswordComponent } from '@/app/auth/recover-password/recover-password.component';
import { RegisterComponent } from '@/app/auth/register/register.component';
import { AssignPasswordComponent } from '@/app/auth/assign-password/assign-password.component';
// #endregion

import { BotsComponent } from '@/app/home/bots/bots.component';

export const routes: Routes = [
  // cuando NO se copia una ruta, se re-dirige al login
  {
    path: '',
    redirectTo: '/iniciar-sesion',
    pathMatch: 'full',
  },

  {
    path: '',
    component: MainAuthComponent,
    children: [
      {
        path: 'iniciar-sesion',
        component: LoginComponent,
      },
      {
        path: 'recuperar-clave',
        component: RecoverPasswordComponent,
      },
      {
        path: 'asignar-nueva-clave/:id',
        component: AssignPasswordComponent,
      },
      {
        path: 'registrarme',
        component: RegisterComponent,
      },
    ],
  },

  {
    path: '',
    component: MainWrapperComponent,

    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],

    children: [
      {
        // /bots
        path: 'bots',
        component: BotsComponent,
      },
    ],
  },

  {
    path: '**',
    component: NotFound404Component,
  },
];
