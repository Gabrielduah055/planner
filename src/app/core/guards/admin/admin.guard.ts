import { CanActivateFn,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';


export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const adminSession = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(environment.ADMIN_TOKEN) : null;

  const router: Router = inject(Router);
  const protectedRoutes: string[] = [
    '/admin-dash',
    '/admin-event',
    '/admin-users',
    '/admin-create-event',
    '/admin-settings',
  ];

  if (adminSession) {
    return protectedRoutes.includes(state.url);
  } else {
    router.navigate(['/login']);
    return false;
  }
};




