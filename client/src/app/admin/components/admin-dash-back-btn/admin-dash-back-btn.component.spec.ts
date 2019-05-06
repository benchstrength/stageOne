import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashBackBtnComponent } from './admin-dash-back-btn.component';

describe('AdminDashBackBtnComponent', () => {
  let component: AdminDashBackBtnComponent;
  let fixture: ComponentFixture<AdminDashBackBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashBackBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashBackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
