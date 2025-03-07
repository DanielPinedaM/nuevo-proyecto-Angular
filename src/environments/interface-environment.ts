export default interface IEnvironment {
  publicEnvironment: 'production' | 'development' | 'test';
  production: boolean;
  api: string;

  auth: {
    login: string;
  };
}
