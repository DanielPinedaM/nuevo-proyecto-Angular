// variables de PRUEBAS

import { IEnvironment } from '@/environments/data-types/interfaces/environment.interface';

const API = 'https://aqui escribir dominio de PRUEBAS';

export const environment: IEnvironment = {
  NODE_ENV: 'test',
  production: false,
  api: API,

  auth: {
    user: 'AQUI FALTA ESCRIBIR USUARIO PARA INICIAR SESION',
    password: 'AQUI FALTA ESCRIBIR CONTRASEÑA PARA INICIAR SESION',
  },
};
