import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendeeGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    const attendeeSession = sessionStorage.getItem(environment.ATTENDEE_TOKEN);
    const onboardingComplete = sessionStorage.getItem('onboardingComplete') === 'true';

    if (!attendeeSession) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!onboardingComplete && !state.url.startsWith('/onboarding-step')) {
      this.router.navigate(['/onboarding-step1']);
      return false;
    }

    if (onboardingComplete && state.url.startsWith('/onboarding-step')) {
      this.router.navigate(['/attendee-home']);
      return false;
    }

    return true;
  }
}
