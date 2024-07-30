import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeFreeCheckoutComponent } from './attendee-free-checkout.component';

describe('AttendeeFreeCheckoutComponent', () => {
  let component: AttendeeFreeCheckoutComponent;
  let fixture: ComponentFixture<AttendeeFreeCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeFreeCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeFreeCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
