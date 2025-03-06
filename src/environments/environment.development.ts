// variables de DESARROLLO (LOCAL)

import IEnvironment from "./interface-environment";

const domain: string = "http://localhost:3000";

export const environment: IEnvironment = {
  production: false,
  domain,

  user: {
    login: `${domain}/login`
  }
};
