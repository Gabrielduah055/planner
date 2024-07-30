import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerDashGraphComponent } from './organizer-dash-graph.component';

describe('OrganizerDashGraphComponent', () => {
  let component: OrganizerDashGraphComponent;
  let fixture: ComponentFixture<OrganizerDashGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerDashGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerDashGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
