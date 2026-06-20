// variables de PRUEBAS

import { IEnvironment } from '@/environments/data-types/interfaces/environment.interface';

const api: string = 'https://aqui escribir dominio de PRUEBAS';

export const environment: IEnvironment = {
  NODE_ENV: 'test',
  production: false,
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
