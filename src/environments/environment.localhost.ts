// variables de DESARROLLO (LOCAL HOST)

const api: string = 'http://localhost:3000';

export const environment = {
  NODE_ENV: 'localhost',
  production: false,
  api,

  auth: {
    login: 'https://localhost:4000/api/vi/login',
    user: 'AQUI FALTA ESCRIBIR USUARIO PARA INICIAR SESION',
    password: 'AQUI FALTA ESCRIBIR CONTRASEÑA PARA INICIAR SESION',
  },
};
