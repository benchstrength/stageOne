import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashSearchComponent } from './admin-dash-search.component';

describe('AdminDashSearchComponent', () => {
  let component: AdminDashSearchComponent;
  let fixture: ComponentFixture<AdminDashSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
