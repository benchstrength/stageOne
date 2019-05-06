import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashUpdateComponent } from './user-dash-update.component';

describe('UserDashUpdateComponent', () => {
  let component: UserDashUpdateComponent;
  let fixture: ComponentFixture<UserDashUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
