import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidPasswordComponent } from './invalid-password.component';

describe('InvalidPasswordComponent', () => {
  let component: InvalidPasswordComponent;
  let fixture: ComponentFixture<InvalidPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
