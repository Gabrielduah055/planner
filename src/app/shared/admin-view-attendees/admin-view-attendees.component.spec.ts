import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAttendeesComponent } from './admin-view-attendees.component';

describe('AdminVieweventdetailsComponent', () => {
  let component: AdminViewAttendeesComponent;
  let fixture: ComponentFixture<AdminViewAttendeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewAttendeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewAttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
