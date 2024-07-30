import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewEventsComponent } from './org-view-events.component';

describe('OrgViewEventsComponent', () => {
  let component: OrgViewEventsComponent;
  let fixture: ComponentFixture<OrgViewEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgViewEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgViewEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
