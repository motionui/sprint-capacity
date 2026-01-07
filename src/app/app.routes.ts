import { Routes } from '@angular/router';

import { PageNotFound } from './components/page-not-found/page-not-found';
import { dashboardGuard } from './guards/dashboard.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then((module) => module.dashboardRoutes),
    canActivate: [dashboardGuard],
  },
  {
    path: 'user-auth',
    loadChildren: () => import('./features/user-auth/user-auth.routes').then((module) => module.userAuthRoutes),
  },
  { path: '**', component: PageNotFound },
];
