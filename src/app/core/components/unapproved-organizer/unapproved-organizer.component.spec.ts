import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedOrganizerComponent } from './unapproved-organizer.component';

describe('UnapprovedOrganizerComponent', () => {
  let component: UnapprovedOrganizerComponent;
  let fixture: ComponentFixture<UnapprovedOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnapprovedOrganizerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnapprovedOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
