export interface IEnvironment {
  NODE_ENV: 'localhost' | 'prod' | 'test';
  production: boolean;
  api: string;

  auth: {
    login: string;
    register: string;
    recoverPassword: string;
    assignPassword: string;

    user: string;
    password: string;
  };
}
