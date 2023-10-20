import { IUser } from '../types';
import React, { useState } from 'react';

export * from './Drawer';
export * from './Footer';
export * from './Header';
export * from './Layout';
export * from './MenuItem';
export * from './MenuItemsList';
export const [user, setUser] = useState<IUser>();