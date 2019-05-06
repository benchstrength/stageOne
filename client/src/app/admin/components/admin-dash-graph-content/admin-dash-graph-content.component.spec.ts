import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashGraphContentComponent } from './admin-dash-graph-content.component';

describe('AdminDashGraphContentComponent', () => {
  let component: AdminDashGraphContentComponent;
  let fixture: ComponentFixture<AdminDashGraphContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashGraphContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashGraphContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
