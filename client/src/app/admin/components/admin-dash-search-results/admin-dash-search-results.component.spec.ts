import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashSearchResultsComponent } from './admin-dash-search-results.component';

describe('AdminDashSearchResultsComponent', () => {
  let component: AdminDashSearchResultsComponent;
  let fixture: ComponentFixture<AdminDashSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
