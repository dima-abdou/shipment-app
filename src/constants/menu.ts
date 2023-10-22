import {
  PersonPin,
  ConnectingAirports,
  AddCard,
  ControlPoint,
  CardTravel,
} from '@mui/icons-material';

import { IMenuItem } from '../types';
import { ROUTES } from './routes';

export const MENU_LIST: IMenuItem[] = [
  {
    route: ROUTES.welcome,
    literal: 'Welcome',
    Icon: PersonPin,
  },
  {
    route: ROUTES.shipList,
    literal: 'My Shipments',
    Icon: CardTravel,
  },
  {
    route: ROUTES.tripList,
    literal: 'My Trips',
    Icon: ConnectingAirports,
  },
  {
    route: ROUTES.createShip,
    literal: 'Create Shipment',
    Icon: AddCard,
  },
  {
    route: ROUTES.createTrip,
    literal: 'Create Trip',
    Icon: ControlPoint,
  },
];
