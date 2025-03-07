export interface IPath {
  empty: string;
  root: string;
  error404NonExistentPathComponent: string;
  auth: {
    login: string;
  };
  home: {
    home: string;
    bots: string;
  };
}
