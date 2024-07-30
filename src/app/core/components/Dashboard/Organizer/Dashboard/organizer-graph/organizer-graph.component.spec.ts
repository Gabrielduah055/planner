import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerGraphComponent } from './organizer-graph.component';

describe('OrganizerGraphComponent', () => {
  let component: OrganizerGraphComponent;
  let fixture: ComponentFixture<OrganizerGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
