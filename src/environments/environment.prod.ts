// variables de PRODUCCIÓN

const api: string = 'https://aqui escribir dominio de PRODUCCION';

export const environment = {
  publicEnvironment: 'prod',
  production: true,
  api,

  auth: {
    login: 'https://dominio.com:4000/api/vi/login',
  },
};
