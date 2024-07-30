import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabledAccountComponent } from './diabled-account.component';

describe('DiabledAccountComponent', () => {
  let component: DiabledAccountComponent;
  let fixture: ComponentFixture<DiabledAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiabledAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiabledAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
