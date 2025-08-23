// variables de PRODUCCIÓN

import IEnvironment from '@/environments/environment.interface';

const api: string = 'https://aqui escribir dominio de PRODUCCION';

export const environment: IEnvironment = {
  publicEnvironment: 'production',
  production: true,
  api,

  auth: {
    login: 'https://dominio.com:4000/api/vi/login',
  },
};
