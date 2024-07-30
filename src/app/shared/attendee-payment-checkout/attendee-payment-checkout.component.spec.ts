import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeePaymentCheckoutComponent } from './attendee-payment-checkout.component';

describe('AttendeePaymentCheckoutComponent', () => {
  let component: AttendeePaymentCheckoutComponent;
  let fixture: ComponentFixture<AttendeePaymentCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeePaymentCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeePaymentCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
