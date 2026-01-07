import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((component) => component.Dashboard),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'resources',
      },
      {
        title: 'Resources',
        path: 'resources',
        loadComponent: () => import('./resources/resources').then((component) => component.Resources),
      },
      {
        title: 'Teams',
        path: 'teams',
        loadComponent: () => import('./teams/teams').then((component) => component.Teams),
      },
      {
        title: 'Roles',
        path: 'roles',
        loadComponent: () => import('./roles/roles').then((component) => component.Roles),
      },
    ],
  },
];
