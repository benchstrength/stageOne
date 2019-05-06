import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashImageComponent } from './user-dash-image.component';

describe('UserDashImageComponent', () => {
  let component: UserDashImageComponent;
  let fixture: ComponentFixture<UserDashImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
