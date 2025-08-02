import IMenuOptions from '@/models/interfaces/menu.interfaces';
import path from '@/models/constants/path.constants';

const menuOptions: IMenuOptions[] = [
  {
    // inicio/bots
    text: 'Bots',
    path: '/' +  path.home.home + '/' + path.home.bots,
    angularMaterialIcon: 'smart_toy',
  },
];

export default menuOptions;
