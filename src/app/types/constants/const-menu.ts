import IMenuOptions from '@/app/types/interfaces/interface-menu';
import path from '@/app/types/constants/cons-path';

const menuOptions: IMenuOptions[] = [
  {
    // inicio/bots
    text: 'Bots',
    path: '/' +  path.home.home + '/' + path.home.bots,
    angularMaterialIcon: 'smart_toy',
  },
];

export default menuOptions;
