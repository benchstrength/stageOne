import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashFocusedGraphComponent } from './admin-dash-focused-graph.component';

describe('AdminDashFocusedGraphComponent', () => {
  let component: AdminDashFocusedGraphComponent;
  let fixture: ComponentFixture<AdminDashFocusedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashFocusedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashFocusedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
