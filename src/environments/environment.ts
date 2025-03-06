// variables de PRODUCCIÓN

import IEnvironment from "./interface-environment";

const domain: string = "https://aqui escribir dominio de PRODUCCION";

export const environment: IEnvironment = {
  production: true,
  domain,

  user: {
    login: `${domain}/login`
  }
};
