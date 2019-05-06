import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashToggleComponent } from './admin-dash-toggle.component';

describe('AdminDashToggleComponent', () => {
  let component: AdminDashToggleComponent;
  let fixture: ComponentFixture<AdminDashToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
