import { IPath } from '../interfaces/interface-path';

const path: IPath = {
  empty: '',
  root: '/',
  error404NonExistentPathComponent: '**',
  login: {
    login: 'iniciar-sesion',
  },
  home: {
    home: 'inicio',
    bots: 'bots',
  },
};

export default path;
