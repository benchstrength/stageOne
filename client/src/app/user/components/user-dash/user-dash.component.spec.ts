import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashComponent } from './user-dash.component';

describe('UserDashComponent', () => {
  let component: UserDashComponent;
  let fixture: ComponentFixture<UserDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
