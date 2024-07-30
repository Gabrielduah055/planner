import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerPreviewPageComponent } from './organizer-preview-page.component';

describe('OrganizerPreviewPageComponent', () => {
  let component: OrganizerPreviewPageComponent;
  let fixture: ComponentFixture<OrganizerPreviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerPreviewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
