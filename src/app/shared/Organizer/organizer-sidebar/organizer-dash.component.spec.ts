import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerDashComponent } from './organizer-dash.component';

describe('OrganizerDashComponent', () => {
  let component: OrganizerDashComponent;
  let fixture: ComponentFixture<OrganizerDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
