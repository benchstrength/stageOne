import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashSecondaryGraphComponent } from './admin-dash-secondary-graph.component';

describe('AdminDashSecondaryGraphComponent', () => {
  let component: AdminDashSecondaryGraphComponent;
  let fixture: ComponentFixture<AdminDashSecondaryGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashSecondaryGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashSecondaryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
