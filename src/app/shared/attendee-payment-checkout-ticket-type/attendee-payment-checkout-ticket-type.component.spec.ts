import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeePaymentCheckoutTicketTypeComponent } from './attendee-payment-checkout-ticket-type.component';

describe('AttendeePaymentCheckoutTicketTypeComponent', () => {
  let component: AttendeePaymentCheckoutTicketTypeComponent;
  let fixture: ComponentFixture<AttendeePaymentCheckoutTicketTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeePaymentCheckoutTicketTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeePaymentCheckoutTicketTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
