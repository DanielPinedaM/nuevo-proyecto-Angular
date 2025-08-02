import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import MyPreset from '@/models/constants/my-preset.constants';
import { providePrimeNG } from 'primeng/config';
import { routes } from '@/app/app.routes';

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
        preset: MyPreset,

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
