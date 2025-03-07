import { IPath } from '../interfaces/interface-path';

const path: IPath = {
  empty: '',
  root: '/',
  error404NonExistentPathComponent: '**',
  auth: {
    login: 'iniciar-sesion',
  },
  home: {
    home: 'inicio',
    bots: 'bots',
  },
};

export default path;
