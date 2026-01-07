import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { map, take } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

export const dashboardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const userAuthService = inject(UserAuthService);

  return userAuthService.user$.pipe(
    take(1),
    map((user) => (user ? true : router.createUrlTree(['user-auth', 'login']))),
  );
};
