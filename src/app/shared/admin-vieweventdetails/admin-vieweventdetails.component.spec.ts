import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVieweventdetailsComponent } from './admin-vieweventdetails.component';

describe('AdminVieweventdetailsComponent', () => {
  let component: AdminVieweventdetailsComponent;
  let fixture: ComponentFixture<AdminVieweventdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVieweventdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVieweventdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
