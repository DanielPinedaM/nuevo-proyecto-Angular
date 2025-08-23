// variables de DESARROLLO (LOCAL HOST)

import IEnvironment from '@/environments/environment.interface';

const api: string = 'http://localhost:3000';

export const environment: IEnvironment = {
  publicEnvironment: 'development',
  production: false,
  api,

  auth: {
    login: 'https://localhost:4000/api/vi/login',
  },
};
