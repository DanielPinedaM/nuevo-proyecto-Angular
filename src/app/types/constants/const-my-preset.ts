import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

/**
Personalizar colores de Prime NG
https://primeng.org/theming#definepreset */
const MyPreset = definePreset(Aura, {
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

export default MyPreset;
