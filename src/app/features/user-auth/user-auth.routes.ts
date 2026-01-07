import { Routes } from '@angular/router';

export const userAuthRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-auth').then((component) => component.UserAuth),
    children: [
      {
        title: 'Account Registration',
        path: 'register',
        loadComponent: () => import('./registration/registration').then((component) => component.Registration),
      },
      {
        title: 'User Login',
        path: 'login',
        loadComponent: () => import('./login/login').then((component) => component.Login),
      },
      {
        title: 'User Logout',
        path: 'logout',
        loadComponent: () => import('./logout/logout').then((component) => component.Logout),
      },
    ],
  },
];
