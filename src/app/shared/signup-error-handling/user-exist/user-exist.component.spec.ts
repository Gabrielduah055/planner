import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExistComponent } from './user-exist.component';

describe('UserExistComponent', () => {
  let component: UserExistComponent;
  let fixture: ComponentFixture<UserExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
