import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import path from './types/constants/cons-path';

//#region componentes de Angular
import { LoginComponent } from './components/auth/login/login.component';

// home
import { HomeComponent } from './components/main-layout/home/home.component';

// error 404 - ruta inexistente
import { Error404NonExistentPathComponent } from './components/main-layout/error-404-non-existent-path/error-404-non-existent-path.component';

// bots
import { BotsComponent } from './components/home/bots/bots.component';
//#endregion componentes de Angular

export const routes: Routes = [
  {
    path: path.empty,
    redirectTo: '/' + path.login.login,
    pathMatch: 'full',
  },
  // iniciar-sesion
  {
    path: path.login.login,
    component: LoginComponent,
  },

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
