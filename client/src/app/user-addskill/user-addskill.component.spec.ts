import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddskillComponent } from './user-addskill.component';

describe('UserAddskillComponent', () => {
  let component: UserAddskillComponent;
  let fixture: ComponentFixture<UserAddskillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddskillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
