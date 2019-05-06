import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashFilterComponent } from './admin-dash-filter.component';

describe('AdminDashFilterComponent', () => {
  let component: AdminDashFilterComponent;
  let fixture: ComponentFixture<AdminDashFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
