import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserPageComponent } from './admin-user-page.component';

describe('AdminUserPageComponent', () => {
  let component: AdminUserPageComponent;
  let fixture: ComponentFixture<AdminUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
