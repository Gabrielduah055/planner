import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInfoSucessComponent } from './business-info-sucess.component';

describe('BusinessInfoSucessComponent', () => {
  let component: BusinessInfoSucessComponent;
  let fixture: ComponentFixture<BusinessInfoSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessInfoSucessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessInfoSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
