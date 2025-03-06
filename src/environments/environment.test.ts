// variables de PRUEBAS

import IEnvironment from "./interface-environment";

const domain: string = "https://aqui escribir dominio de PRUEBAS";

export const environment: IEnvironment = {
  production: false,
  domain,

  user: {
    login: `${domain}/login`
  }
};
