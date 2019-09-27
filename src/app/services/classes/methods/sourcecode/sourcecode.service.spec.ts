import { TestBed } from '@angular/core/testing';

import { SourcecodeService } from './sourcecode.service';

describe('SourcecodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SourcecodeService = TestBed.get(SourcecodeService);
    expect(service).toBeTruthy();
  });
});
