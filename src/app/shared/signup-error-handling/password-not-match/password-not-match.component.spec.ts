import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordNotMatchComponent } from './password-not-match.component';

describe('PasswordNotMatchComponent', () => {
  let component: PasswordNotMatchComponent;
  let fixture: ComponentFixture<PasswordNotMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordNotMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordNotMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
