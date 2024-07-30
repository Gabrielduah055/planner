import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPreloadComponent } from './login-preload.component';

describe('LoginPreloadComponent', () => {
  let component: LoginPreloadComponent;
  let fixture: ComponentFixture<LoginPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPreloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
