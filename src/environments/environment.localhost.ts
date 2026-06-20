// variables de DESARROLLO (LOCAL HOST)

import { IEnvironment } from '@/environments/data-types/interfaces/environment.interface';

const api: string = 'http://localhost:3000/api/v1/';

export const environment: IEnvironment = {
  NODE_ENV: 'localhost',
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
