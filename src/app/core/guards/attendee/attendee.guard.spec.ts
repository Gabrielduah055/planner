import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AttendeeGuard } from './attendee.guard';

describe('AttendeeGuard', () => {
  let guard: AttendeeGuard;
  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AttendeeGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });
    guard = TestBed.inject(AttendeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login if no attendee session', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'environment.ATTENDEE_TOKEN') {
        return null;
      }
      return 'true';
    });

    expect(guard.canActivate({} as any, { url: '/test' } as any)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
