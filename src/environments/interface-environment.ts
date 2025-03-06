export default interface IEnvironment {
  production: boolean,
  domain: string;

  user: {
    login: string;
  }
}
