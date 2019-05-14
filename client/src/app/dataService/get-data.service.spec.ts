import { TestBed } from '@angular/core/testing';

import { GetDataService } from './get-data.service';

describe('GetDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDataService = TestBed.get(GetDataService);
    expect(service).toBeTruthy();
  });
});
