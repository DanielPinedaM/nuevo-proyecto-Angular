import { routes } from '@/app/app.routes';
import { acceptInterceptor } from '@/shared/http-client/interceptors/headers/accept.interceptor';
import { contentTypeInterceptor } from '@/shared/http-client/interceptors/headers/content-type.interceptor';
import { timeoutInterceptor } from '@/shared/http-client/interceptors/timeout.interceptor';
import { withCredentialsInterceptor } from '@/shared/http-client/interceptors/with-credentials.interceptor';
import { loaderInterceptor } from '@/shared/http-client/loader/interceptors/loader.interceptor';
import { errorInterceptor } from '@/shared/http-client/response/error-handling/error.interceptor';
import { successInterceptor } from '@/shared/http-client/response/success.interceptor';
import { TitleCasePipe } from '@angular/common';
import {
  HttpInterceptorFn,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { provideDateAdapter } from '@spartan-ng/brain/date-time';
import { BrnLuxonDateAdapter } from '@spartan-ng/brain/date-time-luxon';
import { provideSpartanHlm } from '@spartan-ng/utils';
import { providePrimeNG } from 'primeng/config';

/**
Personalizar colores de Prime NG
https://primeng.org/theming#definepreset */
const PRIME_NG_PRESET = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{Sky.50}',
      100: '{Sky.100}',
      200: '{Sky.200}',
      300: '{Sky.300}',
      400: '{Sky.400}',
      500: '{Sky.500}',
      600: '{Sky.600}',
      700: '{Sky.700}',
      800: '{Sky.800}',
      900: '{Sky.900}',
      950: '{Sky.950}',
    },
  },
});

// #region componentes de spartan ng
const SPARTAN_NG = [
  provideSpartanHlm(),

  /**
   * Configurar spartan ng
   * para que los componentes de fecha
   * (hlm-calendar, hlm-calendar-multi, hlm-calendar-range, hlm-date-picker)
   * usen DateTime de Luxon y NO new Date() de JavaScript
   *
   * 🚨 PROHIBIDO: ⚠️
   * 1. Eliminar esta línea:
   * sin proveedor para BrnDateAdapterToken,
   * esos componentes lanzan NullInjectorError en runtime.
   *
   * 2. agregar otro provider de fecha
   * (provideNativeDateAdapter, provideUtcDateAdapter, provideDateAdapter(BrnJalaliDateAdapter), etc) */
  provideDateAdapter(BrnLuxonDateAdapter),
];
// #endregion

// #region ⚠️ PROHIBIDO cambiar el orden de esta constante porque puedes generar bugs en consumo de APIs 🚨
const HTTP_CLIENT_INTERCEPTORS: HttpInterceptorFn[] = [
  // GRUPO 1: preparan la REQUEST (solo next(req.clone))
  withCredentialsInterceptor,
  acceptInterceptor,
  contentTypeInterceptor,

  // GRUPO 2: manejan la RESPONSE (.pipe con operadores)
  loaderInterceptor,
  timeoutInterceptor,
  errorInterceptor,
  successInterceptor,
];
// #endregion

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([...HTTP_CLIENT_INTERCEPTORS])),
    provideHotToastConfig(),
    TitleCasePipe,

    ...SPARTAN_NG,

    // configuracion de Prime NG
    providePrimeNG({
      theme: {
        preset: PRIME_NG_PRESET,

        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind, primeng',
          },
        },
      },
    }),
  ],
};
