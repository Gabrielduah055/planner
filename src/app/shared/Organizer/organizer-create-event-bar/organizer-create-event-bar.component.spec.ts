import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerCreateEventBarComponent } from './organizer-create-event-bar.component';

describe('OrganizerCreateEventBarComponent', () => {
  let component: OrganizerCreateEventBarComponent;
  let fixture: ComponentFixture<OrganizerCreateEventBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerCreateEventBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerCreateEventBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
