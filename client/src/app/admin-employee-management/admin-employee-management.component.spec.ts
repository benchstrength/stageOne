import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeManagementComponent } from './admin-employee-management.component';

describe('AdminEmployeeManagementComponent', () => {
  let component: AdminEmployeeManagementComponent;
  let fixture: ComponentFixture<AdminEmployeeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
