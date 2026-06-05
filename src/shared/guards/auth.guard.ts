import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '@/environments/environment';
import { firstValueFrom } from 'rxjs';
import { IResponse } from '@/shared/services/api/general-api/types/request-data.types';
import { ApiGatewayService } from '@/shared/services/api/general-api/http-gateway-observable.api';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const http = inject(ApiGatewayService);
  const router = inject(Router);

  /**
   * 🚨 TODO: ⚠️
   * - Reemplazar URL "reemplazar-por-endpoint-de-autenticacion" por el endpoint de backend encargado de validar la sesión.
   * - NO utilizar localStorage, sessionStorage ni mecanismos similares para almacenar o recuperar el token desde el frontend.
   * - PROHIBIDO:
   * localStorage.setItem("token", jwt);
   * const token = localStorage.getItem("token");
   * - La protección de rutas debe implementarse exclusivamente en auth.guard.ts mediante una petición HTTP al backend encargada de validar la sesión del usuario.
   * - El backend debe leer el JWT desde la cookie HttpOnly
   * - El backend debe validar que el JWT sea valido (firma, fecha de expiracion, etc)
   * - La autenticación debe depender exclusivamente de la validación realizada por el backend sobre la cookie HttpOnly.
   * - Ignorar estas recomendaciones y exponer el JWT al código JavaScript del frontend incrementa significativamente el riesgo de robo del token mediante ataques XSS (Cross-Site Scripting)
   * - Descomentar el código de validación ubicado más abajo para activar la protección de rutas. Actualmente se encuentra comentado únicamente para facilitar pruebas y permitir la navegación sin restricciones durante el desarrollo. */
  //const { success, message, status }: IResponse = await firstValueFrom(
  //  http.GET(`${environment.api}reemplazar-por-endpoint-de-autenticacion`),
  //);

  //if (!success) {
  //  console.error('❌ [auth.guard.ts] Error de autenticación, respuesta de la API: ', {
  //    success,
  //    message,
  //    status,
  //  });

  //  return router.createUrlTree(['/iniciar-sesion']);
  //}

  return true;
};
