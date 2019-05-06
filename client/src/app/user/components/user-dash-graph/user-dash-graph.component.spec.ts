import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashGraphComponent } from './user-dash-graph.component';

describe('UserDashGraphComponent', () => {
  let component: UserDashGraphComponent;
  let fixture: ComponentFixture<UserDashGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
