import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashCardComponent } from './user-dash-card.component';

describe('UserDashCardComponent', () => {
  let component: UserDashCardComponent;
  let fixture: ComponentFixture<UserDashCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
