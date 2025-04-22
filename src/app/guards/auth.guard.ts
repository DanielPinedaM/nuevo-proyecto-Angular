import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import path from '../types/constants/cons-path';
import { objSessionStorage } from '../types/constants/const-session-storage';
import { sessionStorageSearch } from '../utils/func/sessionStorage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    return true; // borrar esta linea de codigo para activar proteccion de rutas
    /* 
    descomentar para activar proteccion de rutas
    if (sessionStorageSearch(objSessionStorage.token!)) {
      return true;
    } else {
      this.router.navigate(['/' + path.auth.login]);
      return false;
    } */
  }
}
