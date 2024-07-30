import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerTopBarComponent } from './organizer-top-bar.component';

describe('OrganizerTopBarComponent', () => {
  let component: OrganizerTopBarComponent;
  let fixture: ComponentFixture<OrganizerTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerTopBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
