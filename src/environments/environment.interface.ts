export interface IEnvironment {
  NODE_ENV: 'localhost' | 'production' | 'test';
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
