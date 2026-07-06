import { routes } from '@/app/app.routes';
import { errorInterceptor } from '@/shared/http-client/response/error.interceptor';
import { successInterceptor } from '@/shared/http-client/response/success.interceptor';
import { timeoutInterceptor } from '@/shared/http-client/interceptors/timeout.interceptor';
import { withCredentialsInterceptor } from '@/shared/http-client/interceptors/with-credentials.interceptor';
import { loaderInterceptor } from '@/shared/http-client/loader/interceptors/loader.interceptor';
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

const HTTP_CLIENT_INTERCEPTORS: HttpInterceptorFn[] = [
  withCredentialsInterceptor,
  loaderInterceptor,
  timeoutInterceptor,
  errorInterceptor,
  successInterceptor,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([...HTTP_CLIENT_INTERCEPTORS])),
    provideHotToastConfig(),

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
