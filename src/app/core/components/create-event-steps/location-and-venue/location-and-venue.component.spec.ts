import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAndVenueComponent } from './location-and-venue.component';

describe('LocationAndVenueComponent', () => {
  let component: LocationAndVenueComponent;
  let fixture: ComponentFixture<LocationAndVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationAndVenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationAndVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
