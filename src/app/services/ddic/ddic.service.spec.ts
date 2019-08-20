import { TestBed } from '@angular/core/testing';

import { DdicService } from './ddic.service';

describe('DdicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DdicService = TestBed.get(DdicService);
    expect(service).toBeTruthy();
  });
});
