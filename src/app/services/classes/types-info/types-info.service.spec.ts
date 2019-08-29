import { TestBed } from '@angular/core/testing';

import { TypesInfoService } from './types-info.service';

describe('TypesInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypesInfoService = TestBed.get(TypesInfoService);
    expect(service).toBeTruthy();
  });
});
