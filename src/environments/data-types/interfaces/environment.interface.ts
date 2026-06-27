export interface IEnvironment {
  NODE_ENV: 'localhost' | 'production' | 'test';
  production: boolean;
  api: string;

  auth: {
    user: string;
    password: string;
  };
}
