import { TestBed } from '@angular/core/testing';

import { InheritanceService } from './inheritance.service';

describe('InheritanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InheritanceService = TestBed.get(InheritanceService);
    expect(service).toBeTruthy();
  });
});
