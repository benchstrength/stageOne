import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashToggleComponent } from './user-dash-toggle.component';

describe('UserDashToggleComponent', () => {
  let component: UserDashToggleComponent;
  let fixture: ComponentFixture<UserDashToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
