export interface IPath {
  empty: string;
  root: string;
  error404NonExistentPathComponent: string;
  auth: {
    login: string;
    recoverPassword: string;
    assignNewPassword: {
      assignNewPassword: string;
      id: string;
    };
    register: string;
  };
  home: {
    home: string;
    bots: string;
  };
}
