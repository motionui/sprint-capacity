import { MenuItem, uuid } from '@motionui/ui-lib';

export const topnavMenuItems: MenuItem[] = [
  {
    id: uuid(),
    label: 'User Profile',
    icon: 'manage_accounts',
    routerLink: ['/user', 'profile'],
  },
  {
    id: uuid(),
    label: 'Logout',
    icon: 'logout',
    routerLink: ['/user-auth', 'logout'],
  },
];

export const sidenavMenuItems: MenuItem[] = [
  {
    id: uuid(),
    label: 'Resources',
    icon: 'people',
    routerLink: ['/dashboard', 'resources'],
  },
  {
    id: uuid(),
    label: 'Teams',
    icon: 'diversity_3',
    routerLink: ['/dashboard', 'teams'],
  },
  {
    id: uuid(),
    label: 'Roles',
    icon: 'recent_actors',
    routerLink: ['/dashboard', 'roles'],
  },
];
