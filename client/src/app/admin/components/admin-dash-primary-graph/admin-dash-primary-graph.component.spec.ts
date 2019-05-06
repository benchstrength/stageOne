import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashPrimaryGraphComponent } from './admin-dash-primary-graph.component';

describe('AdminDashPrimaryGraphComponent', () => {
  let component: AdminDashPrimaryGraphComponent;
  let fixture: ComponentFixture<AdminDashPrimaryGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashPrimaryGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashPrimaryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
