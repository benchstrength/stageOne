import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentExistingComponent } from './user-assessment-existing.component';

describe('UserAssessmentExistingComponent', () => {
  let component: UserAssessmentExistingComponent;
  let fixture: ComponentFixture<UserAssessmentExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
