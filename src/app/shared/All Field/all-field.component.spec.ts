import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFieldComponent } from './all-field.component';

describe('AllFieldComponent', () => {
  let component: AllFieldComponent;
  let fixture: ComponentFixture<AllFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
