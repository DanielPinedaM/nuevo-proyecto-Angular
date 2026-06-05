import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { providePrimeNG } from 'primeng/config';
import { routes } from '@/app/app.routes';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

/**
Personalizar colores de Prime NG
https://primeng.org/theming#definepreset */
const PRESET = definePreset(Aura, {
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideHotToastConfig(),

    // Prime NG
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: PRESET,

        options: {
          // forzar tema blanco en navegadores configurados con tema oscuro
          darkModeSelector: false || 'none',

          cssLayer: {
            name: 'primeng',
            order: 'tailwind, primeng',
          },
        },
      },
    }),
  ],
};
