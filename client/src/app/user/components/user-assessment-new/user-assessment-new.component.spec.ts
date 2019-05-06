import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentNewComponent } from './user-assessment-new.component';

describe('UserAssessmentNewComponent', () => {
  let component: UserAssessmentNewComponent;
  let fixture: ComponentFixture<UserAssessmentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
