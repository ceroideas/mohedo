import { TestBed } from '@angular/core/testing';

import { PanicService } from './panic.service';

describe('PanicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PanicService = TestBed.get(PanicService);
    expect(service).toBeTruthy();
  });
});
