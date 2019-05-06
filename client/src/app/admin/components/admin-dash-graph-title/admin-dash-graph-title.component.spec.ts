import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashGraphTitleComponent } from './admin-dash-graph-title.component';

describe('AdminDashGraphTitleComponent', () => {
  let component: AdminDashGraphTitleComponent;
  let fixture: ComponentFixture<AdminDashGraphTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashGraphTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashGraphTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
