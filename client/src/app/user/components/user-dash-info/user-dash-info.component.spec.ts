import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashInfoComponent } from './user-dash-info.component';

describe('UserDashInfoComponent', () => {
  let component: UserDashInfoComponent;
  let fixture: ComponentFixture<UserDashInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
