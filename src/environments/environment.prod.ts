// variables de PRODUCCIÓN

import { IEnvironment } from '@/environments/environment.interface';

const api: string = 'https://aqui escribir dominio de PRODUCCION';

export const environment: IEnvironment = {
  NODE_ENV: 'prod',
  production: true,
  api,

  auth: {
    login: `${api}login`,
    register: `${api}register`,
    recoverPassword: `${api}recoverPassword`,
    assignPassword: `${api}assignPassword`,

    user: 'AQUI FALTA ESCRIBIR USUARIO PARA INICIAR SESION',
    password: 'AQUI FALTA ESCRIBIR CONTRASEÑA PARA INICIAR SESION',
  },
};
