import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentIntegrationComponent } from './admin-payment-integration.component';

describe('AdminPaymentIntegrationComponent', () => {
  let component: AdminPaymentIntegrationComponent;
  let fixture: ComponentFixture<AdminPaymentIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPaymentIntegrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPaymentIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
