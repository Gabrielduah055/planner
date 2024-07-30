import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerStatasticsComponent } from './organizer-statastics.component';

describe('OrganizerStatasticsComponent', () => {
  let component: OrganizerStatasticsComponent;
  let fixture: ComponentFixture<OrganizerStatasticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerStatasticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerStatasticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
