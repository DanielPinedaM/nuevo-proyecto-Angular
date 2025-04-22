import { IPath } from '../interfaces/interface-path';

const path: IPath = {
  empty: '',
  root: '/',
  error404NonExistentPathComponent: '**',
  auth: {
    login: 'iniciar-sesion',
    recoverPassword: 'recuperar-clave',
    assignNewPassword: {
      assignNewPassword: 'asignar-nueva-clave',
      id: 'asignar-nueva-clave/:id',
    },
    register: 'registrarme',
  },
  home: {
    home: 'inicio',
    bots: 'bots',
  },
};

export default path;
