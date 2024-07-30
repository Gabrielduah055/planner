import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPreloadComponent } from './signup-preload.component';

describe('SignupPreloadComponent', () => {
  let component: SignupPreloadComponent;
  let fixture: ComponentFixture<SignupPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPreloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
