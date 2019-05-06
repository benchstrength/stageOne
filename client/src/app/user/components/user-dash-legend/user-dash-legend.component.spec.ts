import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashLegendComponent } from './user-dash-legend.component';

describe('UserDashLegendComponent', () => {
  let component: UserDashLegendComponent;
  let fixture: ComponentFixture<UserDashLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
