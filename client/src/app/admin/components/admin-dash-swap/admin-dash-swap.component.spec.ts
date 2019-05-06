import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashSwapComponent } from './admin-dash-swap.component';

describe('AdminDashSwapComponent', () => {
  let component: AdminDashSwapComponent;
  let fixture: ComponentFixture<AdminDashSwapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashSwapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
