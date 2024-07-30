import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventAdminComponent } from './create-event-admin.component';

describe('CreateEventAdminComponent', () => {
  let component: CreateEventAdminComponent;
  let fixture: ComponentFixture<CreateEventAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEventAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
