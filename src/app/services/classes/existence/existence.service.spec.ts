import { TestBed } from '@angular/core/testing';

import { ExistenceService } from './existence.service';

describe('ExistenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExistenceService = TestBed.get(ExistenceService);
    expect(service).toBeTruthy();
  });
});
