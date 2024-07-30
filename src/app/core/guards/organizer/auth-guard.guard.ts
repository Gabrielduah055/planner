import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

const isOnboardingComplete = (): boolean => {
  return sessionStorage.getItem('onboardingComplete') === 'true';
};

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const orgSession = sessionStorage.getItem(environment.ORGANIZER_TOKEN);
  const router: Router = inject(Router);
  const protectedRoutes: string[] = [
    '/org-dash',
    '/org-event',
    '/org-create-event',
    '/org-users',
    '/org-settings',
    '/create-event-success',
    '/user-invite',
    '/pagination',
  ];

  if (!orgSession) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

