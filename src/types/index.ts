import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

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