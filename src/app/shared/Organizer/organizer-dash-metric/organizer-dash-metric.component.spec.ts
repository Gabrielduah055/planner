import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerDashMetricComponent } from './organizer-dash-metric.component';

describe('OrganizerDashMetricComponent', () => {
  let component: OrganizerDashMetricComponent;
  let fixture: ComponentFixture<OrganizerDashMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerDashMetricComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerDashMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
