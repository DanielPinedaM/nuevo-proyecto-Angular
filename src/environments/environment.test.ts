// variables de PRUEBAS

import IEnvironment from "./environment.interface";

const api: string = "https://aqui escribir dominio de PRUEBAS";

export const environment: IEnvironment = {
  publicEnvironment: 'test',
  production: false,
  api,

  auth: {
    login: "https://dominio.com:4000/api/vi/login",
  }
};
