import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginErrorHandlingComponent } from './login-error-handling.component';

describe('LoginErrorHandlingComponent', () => {
  let component: LoginErrorHandlingComponent;
  let fixture: ComponentFixture<LoginErrorHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginErrorHandlingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginErrorHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
