import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperSearchComponent } from './developer-search.component';

describe('DeveloperSearchComponent', () => {
  let component: DeveloperSearchComponent;
  let fixture: ComponentFixture<DeveloperSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(DeveloperSearchComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
