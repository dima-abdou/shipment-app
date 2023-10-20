import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

import { IMenuItem } from '../types';
import { ROUTES } from './routes';

export const MENU_LIST: IMenuItem[] = [
  {
    route: ROUTES.main,
    literal: 'Menu Item1',
    Icon: DashboardIcon,
  },
  {
    route: ROUTES.orders,
    literal: 'Menu Item 2',
    Icon: ShoppingCartIcon,
  },
  {
    route: ROUTES.customers,
    literal: 'Menu Item 3',
    Icon: PeopleIcon,
  },
  {
    route: ROUTES.inventory,
    literal: 'Menu Item 4',
    Icon: AttachMoneyIcon,
  },
];
