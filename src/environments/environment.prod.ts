// variables de PRODUCCIÓN

import { IEnvironment } from '@/environments/data-types/interfaces/environment.interface';

const API: string = 'https://aqui escribir dominio de PRODUCCION';

export const environment: IEnvironment = {
  NODE_ENV: 'production',
  production: true,
  api: API,

  auth: {
    user: 'AQUI FALTA ESCRIBIR USUARIO PARA INICIAR SESION',
    password: 'AQUI FALTA ESCRIBIR CONTRASEÑA PARA INICIAR SESION',
  },
};
