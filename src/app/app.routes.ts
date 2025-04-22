import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import path from './types/constants/cons-path';

//#region componentes de Angular
// home
import { HomeComponent } from './components/main-layout/home/home.component';

// auth
import { LoginComponent } from './components/auth/login/login.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AssignPasswordComponent } from './components/auth/assign-password/assign-password.component';

// error 404 - ruta inexistente
import { Error404NonExistentPathComponent } from './components/main-layout/error-404-non-existent-path/error-404-non-existent-path.component';

// bots
import { BotsComponent } from './components/home/bots/bots.component';
//#endregion componentes de Angular

export const routes: Routes = [
  // cuando NO se copia una ruta, se re-dirige al login
  {
    path: path.empty,
    redirectTo: '/' + path.auth.login,
    pathMatch: 'full',
  },
  // iniciar-sesion
  {
    path: path.auth.login,
    component: LoginComponent,
  },

  // /recuperar-clave
  {
    path: path.auth.recoverPassword,
    component: RecoverPasswordComponent,
  },
  // /asignar-nueva-clave/:id
  {
    path: path.auth.assignNewPassword.id,
    component: AssignPasswordComponent,
  },

  // /registrarme
  {
    path: path.auth.register,
    component: RegisterComponent,
  },

  // /inicio re-dirige a /inicio/bots
  {
    path: path.home.home,
    redirectTo: '/' + path.home.home + '/' + path.home.bots,
    pathMatch: 'full',
  },
  {
    path: path.home.home,
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        // inicio/bots
        path: path.home.bots,
        component: BotsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: path.error404NonExistentPathComponent,
    component: Error404NonExistentPathComponent,
  },
];
