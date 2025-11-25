import { Routes } from '@angular/router';
import { AuthGuard } from '@/shared/guards/auth.guard';

// #region auth - autenticacion
import { LoginComponent } from '@/app/auth/login/login.component';
import { RecoverPasswordComponent } from '@/app/auth/recover-password/recover-password.component';
import { RegisterComponent } from '@/app/auth/register/register.component';
import { AssignPasswordComponent } from '@/app/auth/assign-password/assign-password.component';
import { MainAuthComponent } from '@/app/auth/main-auth/main-auth.component';
// #endregion auth - autenticacion

// #region layout - componentes de maquetacion
import { Error404NonExistentPathComponent } from '@/app/layout/error-404-non-existent-path/error-404-non-existent-path.component';
import { HomeComponent } from '@/app/layout/home/home.component';
// #endregion layout - componentes de maquetacion

import { BotsComponent } from '@/app/home/bots/bots.component';

export const routes: Routes = [
  // cuando NO se copia una ruta, se re-dirige al login
  {
    path: '',
    redirectTo: '/autenticacion/iniciar-sesion',
    pathMatch: 'full',
  },

  {
    path: 'autenticacion',
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

  // /inicio re-dirige a /inicio/bots
  {
    path: 'inicio',
    redirectTo: '/inicio/bots',
    pathMatch: 'full',
  },

  {
    path: 'inicio',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        // inicio/bots
        path: 'bots',
        component: BotsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: '**',
    component: Error404NonExistentPathComponent,
  },
];
