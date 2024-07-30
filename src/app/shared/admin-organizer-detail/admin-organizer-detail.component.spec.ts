import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizerDetailComponent } from './admin-organizer-detail.component';

describe('AdminOrganizerDetailComponent', () => {
  let component: AdminOrganizerDetailComponent;
  let fixture: ComponentFixture<AdminOrganizerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrganizerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOrganizerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
