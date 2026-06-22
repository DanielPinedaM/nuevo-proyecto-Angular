// variables de DESARROLLO (LOCAL HOST)

import { IEnvironment } from '@/environments/data-types/interfaces/environment.interface';

const API = 'http://localhost:3000/api/v1/';

export const environment: IEnvironment = {
  NODE_ENV: 'localhost',
  production: false,
  api: API,

  auth: {
    login: `${API}login`,
    register: `${API}register`,
    recoverPassword: `${API}recoverPassword`,
    assignPassword: `${API}assignPassword`,

    user: 'AQUI FALTA ESCRIBIR USUARIO PARA INICIAR SESION',
    password: 'AQUI FALTA ESCRIBIR CONTRASEÑA PARA INICIAR SESION',
  },
};
