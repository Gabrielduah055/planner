import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadGeneralComponent } from './preload-general.component';

describe('PreloadGeneralComponent', () => {
  let component: PreloadGeneralComponent;
  let fixture: ComponentFixture<PreloadGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreloadGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreloadGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
