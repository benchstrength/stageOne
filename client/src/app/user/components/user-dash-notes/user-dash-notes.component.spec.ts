import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashNotesComponent } from './user-dash-notes.component';

describe('UserDashNotesComponent', () => {
  let component: UserDashNotesComponent;
  let fixture: ComponentFixture<UserDashNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
