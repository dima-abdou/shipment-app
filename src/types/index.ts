import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import exp from 'constants';

export interface IMenuItem {
  route?: string;
  literal: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

export interface IUser {
    firstName: string;
    lastName: string;
    token: string;
};

export interface ILocation {
    longitude: number,
    latitude: number,
    displayName: string
}
export interface ILookup{
  id: string,
  name: string,
  baseLookupId:string
}

export const lookupInitialValues : ILookup = {
  id: '',
  name: '',
  baseLookupId: ''
};

export const locationInitials : ILocation = {
    longitude: 0,
    latitude: 0,
    displayName: ''
}