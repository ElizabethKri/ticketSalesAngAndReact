import { TestBed } from '@angular/core/testing';

import { RestInspectorsService } from './rest-inspectors.service';

describe('RestInspectorsService', () => {
  let service: RestInspectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestInspectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
